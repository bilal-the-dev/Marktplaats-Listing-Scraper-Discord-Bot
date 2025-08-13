import { Client } from "discord.js";
import { getMonitorConfig } from "../database/queries.js";
import { createErrorEmbed, createListingEmbed } from "./components.js";
import customFetch from "./customFetch.js";
import { sendInChannel } from "./send.js";
import { CronJob } from "cron";

import {
  MarktplaatsListing,
  MarktplaatsListingsResponse,
} from "./typings/marktplaat.js";
import { genApiURL } from "./misc.js";
import { setTimeout } from "node:timers/promises";

let cachedListingIds: Array<string> = [];
const isDevelopment = process.env.NODE_ENV === "development";
let prevSearchText: string = "";
let startedAt = Date.now();

CronJob.from({
  cronTime: "0 1 0 * * *",
  start: true,
  onTick: () => {
    console.log("Refreshing Cache!!");

    cachedListingIds = [];
  },
  timeZone: "Europe/Amsterdam",
});

export const scraperAndProcessListings = async (
  client: Client
): Promise<void> => {
  try {
    if (client.shouldStopScraping) return await setTimeout(1000 * 60 * 1);

    console.log("Starting to scrape!");

    const monitor = getMonitorConfig.get({});

    if (!monitor)
      return console.log(`No monitor set yet, do using /edit_search_bar`);

    if (prevSearchText && prevSearchText !== monitor.searchText) {
      cachedListingIds = [];
      prevSearchText = monitor.searchText;
      startedAt = Date.now();
      return console.log("Monitor text changed so flushed out old cached data");
    }

    prevSearchText = monitor.searchText;

    const path = genApiURL(monitor.searchText);

    const data = await customFetch<MarktplaatsListingsResponse>({ path });

    // We gonna loop and check for more pages
    const fetchedListings: MarktplaatsListing[] = data.listings.map((l) => l);

    const pages = data.maxAllowedPageNumber - 1; // minus the current page we fetched

    if (pages > 0) {
      // more page exist, fetch them!

      const urls = Array(pages)
        .fill(0)
        .map((_, i) => genApiURL(monitor.searchText, (i + 1) * 100));

      console.log(urls);

      for (const url of urls) {
        const data = await customFetch<MarktplaatsListingsResponse>({
          path: url,
        }).catch(console.error);

        const listings = data ? data.listings : [];

        fetchedListings.push(...listings);

        await setTimeout(1000 * 3);
      }
    }

    console.log(`Fetched ${fetchedListings.length} listings!`);

    // if development, it wont add to cache
    if (!isDevelopment && !cachedListingIds.length) {
      console.log("First time adding in cache!");
      cachedListingIds.push(...fetchedListings.map((a) => a.itemId));
      return;
    }

    const newListings = fetchedListings.filter(
      (l) => !cachedListingIds.includes(l.itemId)
    );

    console.log(`Fetched ${newListings.length} new listings!`);

    const listingsToMapOver =
      isDevelopment && !cachedListingIds.length
        ? newListings.slice(0, 5)
        : newListings; // just in dev, do first 5 on startup

    for (const newListing of listingsToMapOver) {
      if (startedAt + 1000 * 60 * 4 < Date.now()) {
        const embed = createListingEmbed(newListing);

        await sendInChannel(client, embed, process.env.LISTING_CHANNEL_ID);
      }

      cachedListingIds.push(newListing.itemId); // add in cache after processing
    }
  } catch (error) {
    // some error occured, while fetching or anything
    // we'll send logs on discord

    console.error(error);

    if (error instanceof Error) {
      const embed = createErrorEmbed(error);
      await sendInChannel(client, embed, process.env.LOGS_CHANNEL_ID);
    }
  }
};
