import { Message } from "discord.js";
import { matchMan, queue } from "../bot";
import matchName from "../util/matchName";
import playersEmbed from "../util/playersEmbed";

export default function leaveCommand(message: Message) {
  const match = matchMan.nextMatch();

  if (queue.remove(message.author)) {
    message.reply({
      content: `${message.author.toString()} has left the ${matchName(match)} match!`,
      embeds: [playersEmbed(queue)],
    });
  } else {
    message.reply("You have not joined a match yet.");
  }
}
