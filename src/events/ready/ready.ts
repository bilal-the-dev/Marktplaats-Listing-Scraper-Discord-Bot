import { Client } from "discord.js";

import registerAndAttachCommandsOnClient from "../../utils/registrars/registerCommands.js";
import { CronJob } from "cron";
import { scraperAndProcessListings } from "../../utils/scraper.js";

export default async (client: Client<true>) => {
  console.log(`${client.user.username} (${client.user.id}) is ready 🐬`);
  await registerAndAttachCommandsOnClient(client);

  CronJob.from({
    cronTime: "*/10 * * * * *",
    onTick: function () {
      scraperAndProcessListings(client);
    },
    start: true,
  });
};
