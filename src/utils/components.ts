import { EmbedBuilder } from "discord.js";
import { MarktplaatsListing } from "./typings/marktplaat.js";

export function createListingEmbed(listing: MarktplaatsListing): EmbedBuilder {
  const {
    title,
    description,
    vipUrl,
    priceInfo,
    pictures,
    location,
    sellerInformation,
    imageUrls,
  } = listing;

  const url = `${process.env.MARKTPLAATS_BASE_URL}${vipUrl}`;
  const image = pictures?.[0]?.largeUrl ?? imageUrls?.[0] ?? null;
  const city = location?.cityName ?? "Unknown";
  const formattedPrice = (priceInfo.priceCents / 100).toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  });

  const price = priceInfo.priceType === "FAST_BID" ? "Bieden" : formattedPrice;

  return new EmbedBuilder()
    .setTitle(`${price} | ${title}`)
    .setURL(url)
    .setDescription(`${description}`)
    .setColor(0xffa500)
    .setImage(image)
    .addFields([
      {
        name: "💰 Price",
        value: price,
        inline: true,
      },
      {
        name: "📍 Location",
        value: city,
        inline: true,
      },
      {
        name: "👨‍🍳 Seller",
        value: sellerInformation.sellerName,
        inline: true,
      },
    ])
    .setTimestamp();
}

export function createErrorEmbed(error: Error): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(`Error occured!`)
    .setDescription(error.message)
    .setColor("Red")

    .setFooter({ text: "Marktplaats Scraper" })
    .setTimestamp();
}
