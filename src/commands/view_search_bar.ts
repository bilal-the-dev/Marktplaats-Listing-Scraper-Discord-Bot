import { getMonitorConfig, upsertMonitorConfig } from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "view_search_bar",
  description: "View search bar!",
  execute: async (interaction) => {
    const row = getMonitorConfig.get({});

    if (!row)
      throw new Error("Search text is not set yet. DO using /edit_search_bar");

    await interaction.reply(`Current Search Text: \`${row.searchText}\``);
  },
} satisfies extendedAPICommand;
