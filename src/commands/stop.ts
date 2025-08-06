import { getMonitorConfig, upsertMonitorConfig } from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "stop",
  description: "Stop scraping!",
  execute: async (interaction) => {
    interaction.client.shouldStopScraping = true;

    await interaction.reply(`Bot will stop scraping now!`);
  },
} satisfies extendedAPICommand;
