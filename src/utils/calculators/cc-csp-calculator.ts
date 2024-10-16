import type { Trade } from "@prisma/client"
import type { MonthlyTradeData } from "src/types/trades/monthly-trade-data"
import type { TickerTradeData } from "src/types/trades/ticker-trade-data"
import type { WeeklyTradeData } from "src/types/trades/weekly-trade-data"

import convertToFloat from "src/utils/helper-functions/convertToFloat"
import getDayJsDateWithPlugins from "src/utils/helper-functions/dates/get-day-js-date-with-plugins"

export default class CoveredCallCashSecuredPutCalculator {
    private trades: Trade[]

    constructor(trades: Trade[]) {
        this.trades = trades
    }

    // eslint-disable-next-line class-methods-use-this
    private addProfitLoss(trade: Trade) {
        return trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss
    }

    private getAllTimeTotal(): number {
        return convertToFloat(this.trades.reduce((total, trade) => total + this.addProfitLoss(trade), 0))
    }

    // eslint-disable-next-line class-methods-use-this
    private getAverageMonthlyProfitLoss(monthlyTradeData: MonthlyTradeData[], allTimeTotal: number): number {
        return convertToFloat(allTimeTotal / monthlyTradeData.length)
    }

    private getMonthlyTradeData(): MonthlyTradeData[] {
        // group trades by month ( key ) and an object of type MonthlyTradeData will be the ( value )
        const monthlyTrades = this.trades.reduce((obj: Record<string, MonthlyTradeData>, trade) => {
            // get the month and year from the trade date
            const monthYearOfTrade = getDayJsDateWithPlugins(trade.date).format("MM-YYYY")

            // create the object if it doesn't exist and set the values
            if (!obj[monthYearOfTrade]) obj[monthYearOfTrade] = { monthYearOfTrade, total: 0, tradeCount: 0 }

            // accumulate the total and trade count for the month
            obj[monthYearOfTrade].total += this.addProfitLoss(trade)
            obj[monthYearOfTrade].tradeCount += 1

            return obj
        }, {})

        // strip away the month year key and just return the MonthlyTradeData[]
        const monthlyTradeData = Object.values(monthlyTrades)

        // round the totals to 2 decimal places and return a float
        monthlyTradeData.forEach((monthlyTrade) => {
            monthlyTrade.total = convertToFloat(monthlyTrade.total)
        })

        return monthlyTradeData
    }

    private getTickerTradeData(): TickerTradeData[] {
        // group trades by ticker ( key ) and an object of type TickerTradeData will be the ( value )
        const tickerTrades = this.trades.reduce((obj: Record<string, TickerTradeData>, trade) => {
            // create the object if it doesn't exist and set the values
            if (!obj[trade.ticker]) obj[trade.ticker] = { ticker: trade.ticker, total: 0, tradeCount: 0 }

            // increment the total and trade count for the ticker
            obj[trade.ticker].total += this.addProfitLoss(trade)
            obj[trade.ticker].tradeCount += 1

            // return the ticker trade data object
            return obj
        }, {})

        // strip away the ticker key and just return the TickerTradeData[]
        const tickerTradeData = Object.values(tickerTrades)

        // round the totals to 2 decimal places and return a float
        tickerTradeData.forEach((tickerTrade) => {
            tickerTrade.total = convertToFloat(tickerTrade.total)
        })

        return tickerTradeData
    }

    private getWeeklyTradeData(): WeeklyTradeData[] {
        // group trades by week ( key ) and an object of type WeeklyTradeData will be the ( value )
        const weeklyTrades = this.trades.reduce((obj: Record<number, WeeklyTradeData>, trade) => {
            // the date of the trade is the friday expiry day
            const date = getDayJsDateWithPlugins(trade.date)
            const weekOfTheYear = date.week()

            // create the object if it doesn't exist and set the values
            if (!obj[weekOfTheYear]) {
                const startDate = date.subtract(4, "day").format("MM-DD-YYYY")
                const endDate = date.format("MM-DD-YYYY")
                obj[weekOfTheYear] = { endDate, startDate, total: 0, tradeCount: 0, weekOfTheYear }
            }

            // increment the total and trade count for the week
            obj[weekOfTheYear].total += this.addProfitLoss(trade)
            obj[weekOfTheYear].tradeCount += 1

            // return the weekly trade data object
            return obj
        }, {})

        // strip away the weekOfTheYear key and just return the WeeklyTradeData[]
        const weeklyTradeData = Object.values(weeklyTrades)

        // round the totals to 2 decimal places and return a float
        weeklyTradeData.forEach((weeklyTrade) => {
            weeklyTrade.total = convertToFloat(weeklyTrade.total)
        })

        return weeklyTradeData
    }

    public getAllTradeData() {
        const allTimeTotal = this.getAllTimeTotal()
        const monthlyTradeData = this.getMonthlyTradeData()
        const avgMonthlyProfitLoss = this.getAverageMonthlyProfitLoss(monthlyTradeData, allTimeTotal)

        return {
            allTimeTotal,
            avgMonthlyProfitLoss,
            monthlyTradeData,
            tickerTradeData: this.getTickerTradeData(),
            weeklyTradeData: this.getWeeklyTradeData(),
        }
    }
}
