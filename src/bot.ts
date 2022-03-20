import fs from "fs";
import { Client } from "discord.js";
import config from "./config";
import MatchManager from "./MatchManager";

import joinCommand from "./cmds/join";
import nextCommand from "./cmds/next";

export const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });
export const matchMan = new MatchManager();

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
    case "next":
      nextCommand(message);
      break;
  }
});

matchMan.nextMatch();

bot.login(fs.readFileSync("token").toString().trim());
