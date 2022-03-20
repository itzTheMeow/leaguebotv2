import { Message, MessageEmbed } from "discord.js";
import { matchMan } from "../bot";
import config from "../config";
import { buildTimestamp } from "../util/timestamp";

export default function nextCommand(message: Message) {
  const match = matchMan.nextMatch();
  message.reply({
    embeds: [
      new MessageEmbed()
        .setTitle(`The next match is ${buildTimestamp(match, true)}.`)
        .setDescription(
          `Use \`${config.prefix}notify\` to be pinged when matches open for joining.`
        )
        .setColor(config.colors.blue)
        .addField("Match Starts", buildTimestamp(match)),
    ],
  });
}
