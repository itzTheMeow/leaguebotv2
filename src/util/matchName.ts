import { DateTime } from "luxon";

export default function matchName(time: DateTime) {
  return time.toFormat("h:mma").toLowerCase();
}
