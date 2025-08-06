import { upsertMonitorConfig } from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "edit_search_bar",
  description: "Edit search bar!",
  options: [
    { type: 3, name: "search_text", description: "the text", required: true },
  ],
  execute: async (interaction) => {
    const searchText = interaction.options.getString("search_text", true);

    upsertMonitorConfig.run({ searchText });

    interaction.client.shouldStopScraping = false;
    await interaction.reply(`Search text now is \`${searchText}\`!`);
  },
} satisfies extendedAPICommand;
