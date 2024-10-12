import type { Trade } from "@prisma/client"
import type { MonthlyTradeData } from "src/types/trades/monthly-trade-data"
import type { TickerTradeData } from "src/types/trades/ticker-trade-data"
import type { WeeklyTradeData } from "src/types/trades/weekly-trade-data"

import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"

dayjs.extend(weekOfYear)

export default class CoveredCallCashSecuredPutCalculator {
    private trades: Trade[]

    constructor(trades: Trade[]) {
        this.trades = trades
    }

    private getAllTimeTotal(): number {
        return parseFloat(
            this.trades
                .reduce((total, trade) => total + (trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss), 0)
                .toFixed(2),
        )
    }

    private getAverageMonthlyProfitLoss(monthlyTradeData: MonthlyTradeData[]): number {
        // add up the sums for each month and divide by the number of months
        return parseFloat((this.getAllTimeTotal() / monthlyTradeData.length).toFixed(2))
    }

    private getMonthlyTradeData(): MonthlyTradeData[] {
        // group trades by month ( key ) and an object of type MonthlyTradeData will be the ( value )
        const monthlyTrades: Record<string, MonthlyTradeData> = this.trades.reduce((obj, trade) => {
            // get the month and year from the trade date
            const monthYearOfTrade = dayjs(trade.date).format("MM-YYYY")

            // create the object if it doesn't exist and set the values
            if (!obj[monthYearOfTrade]) obj[monthYearOfTrade] = { monthYearOfTrade, total: 0, tradeCount: 0 }

            // accumulate the total and trade count for the month
            obj[monthYearOfTrade].total += trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss
            obj[monthYearOfTrade].tradeCount += 1

            return obj
        }, {})

        // strip away the month year key and just return the MonthlyTradeData[]
        const monthlyTradeData = Object.values(monthlyTrades)

        // round the totals to 2 decimal places and return a float
        monthlyTradeData.forEach((monthlyTrade) => {
            monthlyTrade.total = parseFloat(monthlyTrade.total.toFixed(2))
        })

        return monthlyTradeData
    }

    private getTickerTradeData(): TickerTradeData[] {
        // group trades by ticker ( key ) and an object of type TickerTradeData will be the ( value )
        const tickerTrades: Record<string, TickerTradeData> = this.trades.reduce((obj, trade) => {
            // create the object if it doesn't exist and set the values
            if (!obj[trade.ticker]) obj[trade.ticker] = { ticker: trade.ticker, total: 0, tradeCount: 0 }

            // increment the total and trade count for the ticker
            obj[trade.ticker].total += trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss
            obj[trade.ticker].tradeCount += 1

            // return the ticker trade data object
            return obj
        }, {})

        // strip away the ticker key and just return the TickerTradeData[]
        const tickerTradeData = Object.values(tickerTrades)

        // round the totals to 2 decimal places and return a float
        tickerTradeData.forEach((tickerTrade) => {
            tickerTrade.total = parseFloat(tickerTrade.total.toFixed(2))
        })

        return tickerTradeData
    }

    private getWeeklyTradeData(): WeeklyTradeData[] {
        // group trades by week ( key ) and an object of type WeeklyTradeData will be the ( value )
        const weeklyTrades: Record<number, WeeklyTradeData> = this.trades.reduce((obj, trade) => {
            // the date of the trade is the friday expiry day
            const date = dayjs(trade.date)
            const weekOfTheYear = date.week()

            // create the object if it doesn't exist and set the values
            if (!obj[weekOfTheYear]) {
                const startDate = date.subtract(4, "day").format("MM-DD-YYYY")
                const endDate = date.format("MM-DD-YYYY")
                obj[weekOfTheYear] = { endDate, startDate, total: 0, tradeCount: 0, weekOfTheYear }
            }

            // increment the total and trade count for the week
            obj[weekOfTheYear].total += trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss
            obj[weekOfTheYear].tradeCount += 1

            // return the weekly trade data object
            return obj
        }, {})

        // strip away the weekOfTheYear key and just return the WeeklyTradeData[]
        const weeklyTradeData = Object.values(weeklyTrades)

        // round the totals to 2 decimal places and return a float
        weeklyTradeData.forEach((weeklyTrade) => {
            weeklyTrade.total = parseFloat(weeklyTrade.total.toFixed(2))
        })

        return weeklyTradeData
    }

    public getAllTradeData() {
        const allTimeTotal = this.getAllTimeTotal()
        const monthlyTradeData = this.getMonthlyTradeData()
        const avgMonthlyProfitLoss = this.getAverageMonthlyProfitLoss(monthlyTradeData)

        return {
            allTimeTotal,
            avgMonthlyProfitLoss,
            monthlyTradeData,
            tickerTradeData: this.getTickerTradeData(),
            weeklyTradeData: this.getWeeklyTradeData(),
        }
    }
}
