import { Client } from "discord.js";

import registerAndAttachCommandsOnClient from "../../utils/registrars/registerCommands.js";
import { scraperAndProcessListings } from "../../utils/scraper.js";

export default async (client: Client<true>) => {
  console.log(`${client.user.username} (${client.user.id}) is ready 🐬`);
  await registerAndAttachCommandsOnClient(client);

  while (true) {
    // if single page, then it just keeps making request after milliseconds man because of no delay!!!
    await scraperAndProcessListings(client);
  }
};
