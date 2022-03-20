import { Message } from "discord.js";
import config from "../config";

export default function notifyCommand(message: Message) {
  const hasNotifs = message.member.roles.cache.some((r) => r.name == config.notifRole);
  const role = message.guild.roles.cache.find((r) => r.name == config.notifRole);
  if (!role) return;

  if (hasNotifs) message.member.roles.remove(role);
  else message.member.roles.add(role);

  message.reply(
    `You have ${hasNotifs ? "removed" : "received"} the ${config.notifRole} role and will ${
      hasNotifs ? "no longer " : ""
    }be pinged when league matches open up for joining.`
  );
}
