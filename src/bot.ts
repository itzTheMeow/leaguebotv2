import fs from "fs";
import { Client, Guild, GuildMember, TextBasedChannel } from "discord.js";
import config from "./config";
import MatchManager from "./MatchManager";
import Queue from "./QueueManager";

import joinCommand from "./cmds/join";
import leaveCommand from "./cmds/leave";
import nextCommand from "./cmds/next";
import notifyCommand from "./cmds/notify";
import playersCommand from "./cmds/players";
import timesCommand from "./cmds/times";

export const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });
export const matchMan = new MatchManager();
export const queue = new Queue();

queue.start(matchMan.nextMatch());

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity(config.status);
});

bot.on("messageCreate", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  switch (message.content.split(/ +/g)[0].substring(config.prefix.length).toLowerCase()) {
    case "join":
      joinCommand(message);
      break;
    case "leave":
      leaveCommand(message);
      break;
    case "next":
      nextCommand(message);
      break;
    case "notify":
      notifyCommand(message);
      break;
    case "players":
      playersCommand(message);
      break;
    case "times":
      timesCommand(message);
      break;
  }
});

bot.on("interactionCreate", async (interaction) => {
  const mem = interaction.member as GuildMember;
  const guild = interaction.guild as Guild;

  if (interaction.isButton()) {
    if (interaction.customId == "register") {
      const role = guild.roles.cache.find((r) => r.name == config.notifRole);
      if (role) mem.roles.add(role);
      const chan = guild.channels.cache.find(
        (c) => c.name == config.generalChannel
      ) as TextBasedChannel;
      if (chan) chan.send(`${mem.toString()} has become a league member!`);
      interaction.deferUpdate();
      return;
    }
  }
});

bot.login(fs.readFileSync("token").toString().trim());
