import { DateTime } from "luxon";

export default function minutesUntil(t1: DateTime, t2: DateTime) {
  return Math.floor((t2.toMillis() - t1.toMillis()) / 60000);
}
