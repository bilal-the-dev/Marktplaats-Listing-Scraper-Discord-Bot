import { Client } from "discord.js";

import registerAndAttachCommandsOnClient from "../../utils/registrars/registerCommands.js";
import { scraperAndProcessListings } from "../../utils/scraper.js";
import { setTimeout } from "node:timers/promises";

export default async (client: Client<true>) => {
  console.log(`${client.user.username} (${client.user.id}) is ready 🐬`);
  await registerAndAttachCommandsOnClient(client);

  while (true) {
    await scraperAndProcessListings(client);
    await setTimeout(1000 * 5);
  }
};
