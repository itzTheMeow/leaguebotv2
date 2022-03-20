import { TextChannel } from "discord.js";
import { DateTime } from "luxon";

export type MatchTime = [number, number];

const pm = 12;
const defaultMatchTimes: MatchTime[] = [
  [3, 0],
  [6, 0],
  [7, 0],
  [11, 0],
  [3 + pm, 0],
  [4 + pm, 0],
  [5 + pm, 0],
  [6 + pm, 0],
  [7 + pm, 0],
  [8 + pm, 0],
  [9 + pm, 0],
  [10 + pm, 0],
  [11 + pm, 0],
];

export default class MatchManager {
  private customMatches: MatchTime[] = [];
  public get matches() {
    return [...defaultMatchTimes, ...this.customMatches];
  }
  public get matchDates() {
    return this.matches
      .map((m) => {
        let date = DateTime.fromObject({
          hour: m[0],
          minute: m[1],
        });
        if (date.toMillis() <= DateTime.now().toMillis()) date = date.plus({ day: 1 });
        return date;
      })
      .sort((m1, m2) => m1.toMillis() - m2.toMillis());
  }

  public channel: TextChannel;

  constructor() {}

  public nextMatch() {
    return this.matchDates[0];
  }
}
