import type { MonthlyTradeData } from "src/types/trades/monthly-trade-data"
import type { TickerTradeData } from "src/types/trades/ticker-trade-data"
import type { WeeklyTradeData } from "src/types/trades/weekly-trade-data"

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
    monthlyTradeData: MonthlyTradeData[]

    /* key is the ticker symbol and value is the total amount made from that ticker */
    tickerTradeData: TickerTradeData[]

    /* the trade data of the week */
    weeklyTradeData: WeeklyTradeData[]
}
