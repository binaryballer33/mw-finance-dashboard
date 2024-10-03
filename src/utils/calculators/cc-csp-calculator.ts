import type { MonthlyTradeData } from "src/types/trades/monthly-trade-data"
import type { Trade } from "src/types/trades/trade"
import type { WeeklyTradeData } from "src/types/trades/weekly-trade-data"

import { getWeek, subDays } from "date-fns"

export default class CoveredCallCashSecuredPutCalculator {
    private trades: Trade[]

    constructor(trades: Trade[]) {
        this.trades = trades
    }

    private getAllTimeTotal(): number {
        return this.trades.reduce((total, trade) => {
            return total + (trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss)
        }, 0)
    }

    private getMonthlyProfitLoss(): Record<string, MonthlyTradeData> {
        return this.trades.reduce((monthlyTotals, trade) => {
            const monthYearOfTrade = new Date(trade.date).toLocaleString("default", { month: "short", year: "numeric" })

            if (!monthlyTotals[monthYearOfTrade]) monthlyTotals[monthYearOfTrade] = { total: 0, tradeCount: 0 }

            monthlyTotals[monthYearOfTrade].total += trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss
            monthlyTotals[monthYearOfTrade].tradeCount += 1

            return monthlyTotals
        }, {})
    }

    private getTickerProfitLoss(): Record<string, number> {
        return this.trades.reduce((tickerTotals, trade) => {
            if (!tickerTotals[trade.ticker]) tickerTotals[trade.ticker] = 0

            tickerTotals[trade.ticker] += trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss
            return tickerTotals
        }, {})
    }

    private getWeeklyProfitLoss(): Record<string, WeeklyTradeData> {
        return this.trades.reduce((weeklyTotals, trade) => {
            const weekOfTheYear = getWeek(trade.date)

            if (!weeklyTotals[weekOfTheYear]) {
                const endDate = new Date(trade.date)
                const startDate = subDays(endDate, 4)
                weeklyTotals[weekOfTheYear] = { endDate, startDate, total: 0, tradeCount: 0 }
            }

            weeklyTotals[weekOfTheYear].total += trade.realized === "GAIN" ? trade.profitLoss : -trade.profitLoss
            weeklyTotals[weekOfTheYear].tradeCount += 1

            return weeklyTotals
        }, {})
    }

    public getAllTradeData() {
        return {
            allTimeTotal: this.getAllTimeTotal(),
            monthlyTotals: this.getMonthlyProfitLoss(),
            tickerTotals: this.getTickerProfitLoss(),
            weeklyTotals: this.getWeeklyProfitLoss(),
        }
    }
}
