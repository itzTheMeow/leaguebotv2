import fs from "fs";
import { Client } from "discord.js";
import config from "./config";

const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity(config.status);
});

bot.login(fs.readFileSync("token").toString().trim());
