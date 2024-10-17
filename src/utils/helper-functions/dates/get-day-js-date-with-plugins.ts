import type { Dayjs } from "dayjs"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import duration from "dayjs/plugin/duration"
import isBetween from "dayjs/plugin/isBetween"
import isoWeek from "dayjs/plugin/isoWeek"
import weekOfYear from "dayjs/plugin/weekOfYear"

dayjs.extend(weekOfYear)
dayjs.extend(duration)
dayjs.extend(isoWeek)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)

/**
 * Docs: https://day.js.org/docs/en/display/format
 */
export const formatStr = {
    date: "DD MMM YYYY", // 17 Apr 2022
    dateTime: "DD MMM YYYY h:mm a", // 17 Apr 2022 12:00 am
    monthYear: "MM-YYYY", // Apr 2022
    paramCase: {
        date: "DD-MM-YYYY", // 17-04-2022
        dateTime: "DD-MM-YYYY h:mm a", // 17-04-2022 12:00 am
    },
    split: {
        date: "DD/MM/YYYY", // 17/04/2022
        dateTime: "DD/MM/YYYY h:mm a", // 17/04/2022 12:00 am
    },
    time: "h:mm a", // 12:00 am
}

/* get a dayjs date with the plugins from a regular Date instance or string */
export default function getDayJsDateWithPlugins(date: Date | string, format?: string) {
    return dayjs(date, format)
}

/* returns useful information derived from a given date in respect to trades */
export function getDayJsObjectForTrades(date: Dayjs) {
    return {
        endDate: date.format("MM-DD-YYYY"),
        month: date.month() + 1,
        startDate: date.subtract(4, "day").format("MM-DD-YYYY"),
        week: date.week(),
        year: date.year(),
    }
}
