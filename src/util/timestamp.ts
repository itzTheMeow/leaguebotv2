import { DateTime } from "luxon";

export function buildTimestamp(date: DateTime, relative = false) {
  return `<t:${date.toSeconds()}:${relative ? "R" : "t"}>`;
}
