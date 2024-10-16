import type { MonthlyTrade, TickerTrade, WeeklyTrade } from "@prisma/client"

/*
 * allTimeTotal - the total amount of money you made from this trade data all time
 * avgMonthlyProfitLoss - average profit or loss made that month
 * monthlyTradeData - key is month and value is the trade data of the month
 * tickerTradeData - key is the ticker symbol and value is the total amount made from that ticker
 * weeklyTradeData - the trade data of the week
 */
export type TradeData = {
    /* the total amount of money you made from this trade data all time  */
    allTimeTotal: number

    /* average profit or loss made that month  */
    avgMonthlyProfitLoss: number

    /* key is month and value is the trade data of the month */
    monthlyTradeData: MonthlyTrade[]

    /* key is the ticker symbol and value is the total amount made from that ticker */
    tickerTradeData: TickerTrade[]

    /* the trade data of the week */
    weeklyTradeData: WeeklyTrade[]
}
