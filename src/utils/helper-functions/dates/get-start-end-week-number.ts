import { endOfWeek, format, getWeek, startOfWeek } from "date-fns"

export const getWeekOfYear = (dateString: string) => {
    const date = new Date(dateString)
    return getWeek(date)
}

export const getStartDateOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    return format(startOfWeek(date), "yyyy-MM-dd")
}

export const getEndDateOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    return format(endOfWeek(date), "yyyy-MM-dd")
}
