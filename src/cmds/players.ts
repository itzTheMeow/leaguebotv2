import { Message } from "discord.js";
import { queue } from "../bot";
import config from "../config";
import playersEmbed from "../util/playersEmbed";

export default function playersCommand(message: Message) {
  if (!queue.active)
    message.reply(`There are no matches open for joining currently!
To see when the next match is, use \`${config.prefix}next\`.`);
  else {
    message.reply({ embeds: [playersEmbed(queue)] });
  }
}
