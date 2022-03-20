"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queue = exports.matchMan = exports.bot = void 0;
const fs_1 = __importDefault(require("fs"));
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("./config"));
const MatchManager_1 = __importDefault(require("./MatchManager"));
const QueueManager_1 = __importDefault(require("./QueueManager"));
const join_1 = __importDefault(require("./cmds/join"));
const leave_1 = __importDefault(require("./cmds/leave"));
const next_1 = __importDefault(require("./cmds/next"));
const notify_1 = __importDefault(require("./cmds/notify"));
const players_1 = __importDefault(require("./cmds/players"));
const times_1 = __importDefault(require("./cmds/times"));
exports.bot = new discord_js_1.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });
exports.matchMan = new MatchManager_1.default();
exports.queue = new QueueManager_1.default();
exports.queue.start(exports.matchMan.nextMatch());
exports.bot.on("ready", () => {
    console.log(`Logged in as ${exports.bot.user.tag}!`);
    exports.bot.user.setActivity(config_1.default.status);
});
exports.bot.on("messageCreate", (message) => {
    if (!message.content.startsWith(config_1.default.prefix) || message.author.bot)
        return;
    switch (message.content.split(/ +/g)[0].substring(config_1.default.prefix.length).toLowerCase()) {
        case "join":
            (0, join_1.default)(message);
            break;
        case "leave":
            (0, leave_1.default)(message);
            break;
        case "next":
            (0, next_1.default)(message);
            break;
        case "notify":
            (0, notify_1.default)(message);
            break;
        case "players":
            (0, players_1.default)(message);
            break;
        case "times":
            (0, times_1.default)(message);
            break;
    }
});
exports.bot.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const mem = interaction.member;
    const guild = interaction.guild;
    if (interaction.isButton()) {
        if (interaction.customId == "register") {
            const role = guild.roles.cache.find((r) => r.name == config_1.default.notifRole);
            if (role)
                mem.roles.add(role);
            const chan = guild.channels.cache.find((c) => c.name == config_1.default.generalChannel);
            if (chan)
                chan.send(`${mem.toString()} has become a league member!`);
            interaction.deferUpdate();
            return;
        }
    }
}));
exports.bot.login(fs_1.default.readFileSync("token").toString().trim());
