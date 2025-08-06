import { Client, EmbedBuilder } from "discord.js";

export const sendInChannel = async (
  client: Client,
  embeds: EmbedBuilder,
  channelId: string
) => {
  const channel = client.channels.cache.get(channelId);

  if (!channel)
    console.log(`Tried to send message on discord but channel not found`);

  if (channel?.isSendable()) await channel.send({ embeds: [embeds] });
};
