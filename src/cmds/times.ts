import { Message, MessageEmbed } from "discord.js";
import { matchMan } from "../bot";
import { buildTimestamp } from "../util/timestamp";

export default function timesCommand(message: Message) {
  const times = matchMan.matchDates;

  message.reply({
    embeds: [
      new MessageEmbed()
        .setTitle("Match Times")
        .setDescription(times.map((t) => buildTimestamp(t)).join(", ")),
    ],
  });
}
