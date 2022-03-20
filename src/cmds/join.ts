import { Message } from "discord.js";
import { DateTime } from "luxon";
import { matchMan } from "../bot";
import config from "../config";
import minutesUntil from "../util/minutesUntil";
import { isMember } from "../util/tests";

export default function joinCommand(message: Message) {
  if (!isMember(message.member))
    return message.reply(
      `Only ${config.memberRole} can join league matches. To become a member, use \`${config.prefix}register\`.`
    );

  const match = matchMan.nextMatch();

  if (minutesUntil(match, DateTime.now()) > config.matchOpening)
    return message.reply(
      `There are no matches open for joining currently!

To see when the next match is, use \`${config.prefix}next\`
To see a list of all match times, use \`${config.prefix}times\`.
To get notified when matches open up, use \`${config.prefix}notify\``
    );
}
