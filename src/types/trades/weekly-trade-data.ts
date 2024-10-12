/*
 * endDate - the friday date that the trade expired
 * startDate - the monday date that the trade started
 * total - the total amount made from trades this month
 * tradeCount - the total amount of trades made this month
 * weekOfTheYear -the week number of the year for this trade
 * */
export type WeeklyTradeData = {
    /* the friday date that the trade expired */
    endDate: Date

    /* the monday date that the trade started */
    startDate: Date

    /* the total amount made from trades this month */
    total: number

    /* the total amount of trades made this month */
    tradeCount: number

    /* week number of the year for this trade */
    weekOfTheYear: number
}
