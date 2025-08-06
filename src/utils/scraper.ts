import { Client } from "discord.js";
import { getMonitorConfig } from "../database/queries.js";
import { createErrorEmbed, createListingEmbed } from "./components.js";
import customFetch from "./customFetch.js";
import { sendInChannel } from "./send.js";

import { MarktplaatsListingsResponse } from "./typings/marktplaat.js";

let cachedListingIds: Array<string> = [];
const isDevelopment = process.env.NODE_ENV === "development";
let prevSearchText: string = "";

export const scraperAndProcessListings = async (
  client: Client
): Promise<void> => {
  try {
    console.log("Starting to scrape!");

    const monitor = getMonitorConfig.get({});

    if (!monitor)
      return console.log(`No monitor set yet, do using /edit_search_bar`);

    if (prevSearchText && prevSearchText !== monitor.searchText) {
      cachedListingIds = [];
      prevSearchText = monitor.searchText;
      return console.log("Monitor text changed so flushed out old cached data");
    }

    prevSearchText = monitor.searchText;

    const path = `/lrp/api/search?attributesById[]=0&attributesByKey[]=offeredSince%3AVandaag&limit=30&offset=0&query=${monitor.searchText}&searchInTitleAndDescription=true&viewOptions=list-view`;

    const data = await customFetch<MarktplaatsListingsResponse>({ path });

    const fetchedListings = data.listings.map((l) => l);

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
      const embed = createListingEmbed(newListing);

      await sendInChannel(client, embed, process.env.LISTING_CHANNEL_ID);

      cachedListingIds.push(newListing.itemId); // add in cache after processing
    }
  } catch (error) {
    // some error occured, while fetching or anything
    // we'll send logs on discord

    console.log(error);

    if (error instanceof Error) {
      const embed = createErrorEmbed(error);
      await sendInChannel(client, embed, process.env.LOGS_CHANNEL_ID);
    }
  }
};
