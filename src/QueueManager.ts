import { User } from "discord.js";
import { DateTime } from "luxon";

export default class Queue {
  public players: User[] = [];
  public time: DateTime = null;

  public get active() {
    return !!this.time;
  }

  constructor() {}

  public start(time: DateTime) {
    this.wipe();
    this.time = time;
  }
  public add(user: User) {
    if (!this.active) return false;
    if (!this.players.includes(user)) {
      this.players.push(user);
      return true;
    } else return false;
  }
  public remove(user: User) {
    if (!this.active) return false;
    if (this.players.includes(user)) {
      this.players.splice(this.players.indexOf(user), 1);
      return true;
    } else return false;
  }

  public wipe() {
    this.players = [];
    this.time = null;
  }
}
