/*
 * total - the total amount made from trades this month
 * tradeCount - the total amount of trades made this month
 * monthYearOfTrade - the month and year of the trade
 * */
export type MonthlyTradeData = {
    /* the month and year of the trade */
    monthYearOfTrade: string

    /* the total amount made from trades this month */
    total: number

    /* the total amount of trades made this month */
    tradeCount: number
}
