import { GuildMember } from "discord.js";
import config from "../config";

export function isMember(mem: GuildMember) {
  return mem.roles.cache.some((r) => r.name == config.memberRole);
}
