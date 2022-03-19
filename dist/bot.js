"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("./config"));
const bot = new discord_js_1.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    console.log(bot.generateInvite({ scopes: ["bot"] }));
    bot.user.setActivity(config_1.default.status);
});
bot.login(fs_1.default.readFileSync("token").toString().trim());
