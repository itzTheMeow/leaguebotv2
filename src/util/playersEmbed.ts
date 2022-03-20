import { MessageEmbed } from "discord.js";
import Queue from "../QueueManager";

export default function playersEmbed(queue: Queue) {
  return new MessageEmbed()
    .setTitle(`${queue.players.length} Player${queue.players.length == 1 ? "" : "s"}`)
    .setDescription(queue.players.map((p) => p.toString()).join(", ") || "No Players")
    .setColor("DARK_PURPLE");
}
