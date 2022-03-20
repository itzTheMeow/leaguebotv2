import { Message } from "discord.js";
import { matchMan, queue } from "../bot";
import config from "../config";
import matchName from "../util/matchName";
import playersEmbed from "../util/playersEmbed";
import { isMember } from "../util/tests";

export default function joinCommand(message: Message) {
  if (!isMember(message.member))
    return message.reply(
      `Only ${config.memberRole} can join league matches. To become a member, use \`${config.prefix}register\`.`
    );

  if (!queue.active)
    return message.reply(
      `There are no matches open for joining currently!

To see when the next match is, use \`${config.prefix}next\`.
To see a list of all match times, use \`${config.prefix}times\`.
To get notified when matches open up, use \`${config.prefix}notify\`.`
    );

  const match = matchMan.nextMatch();

  if (queue.add(message.author)) {
    message.reply({
      content: `${message.author.toString()} has joined the ${matchName(match)} match!`,
      embeds: [playersEmbed(queue)],
    });
  } else {
    message.reply({
      content: `You have already joined the ${matchName(match)} match.`,
      embeds: [playersEmbed(queue)],
    });
  }
}
