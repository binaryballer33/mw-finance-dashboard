import type { Trade } from "@prisma/client"

import prisma from "src/utils/database/prisma"
import convertToFloat from "src/utils/helper-functions/convertToFloat"
import getDayJsDateWithPlugins, {
    getDayJsObjectForTrades,
} from "src/utils/helper-functions/dates/get-day-js-date-with-plugins"

import upsertMonthlyTrade from "src/actions/trades/mutations/upsert-monthly-trade"
import upsertTickerTrade from "src/actions/trades/mutations/upsert-ticker-trade"
import upsertWeeklyTrade from "src/actions/trades/mutations/upsert-weekly-trade"

export default async function createTrade(trade: Trade) {
    const profitLossPercentage = convertToFloat(100 - (trade.buyToClose / trade.sellToOpen) * 100)
    const dateOfTheTrade = getDayJsDateWithPlugins(trade.date)
    const dateObj = getDayJsObjectForTrades(dateOfTheTrade)

    const createdTrade = await prisma.$transaction(async (dbClient) => {
        // create the MonthlyTrade or update it, if it already exists
        const { id: monthlyTradeId } = (await upsertMonthlyTrade({ date: dateObj, dbClient, trade }))!

        // create the WeeklyTrade or update it, if it already exists
        const { id: weeklyTradeId } = (await upsertWeeklyTrade({ date: dateObj, dbClient, monthlyTradeId, trade }))!

        // create the TickerTrade or update it, if it already exists
        const { id: tickerTradeId } = (await upsertTickerTrade({ dbClient, trade }))!

        try {
            // create the Trade and associate it with its corresponding WeeklyTrade, MonthlyTrade and TickerTrade
            return await dbClient.trade.create({
                data: {
                    buyToClose: trade.buyToClose,
                    contracts: trade.contracts,
                    date: trade.date,
                    monthlyTradeId,
                    profitLoss: trade.profitLoss,
                    profitLossPercentage,
                    realized: trade.realized,
                    sellToOpen: trade.sellToOpen,
                    strike: trade.strike,
                    ticker: trade.ticker,
                    tickerTradeId,
                    type: trade.type,
                    weeklyTradeId,
                },
            })
        } catch (error) {
            console.error(`Error Creating Trade ${trade.ticker} ${trade.type} ${trade.strike}: ${error}`)
            return null
        }
    })
    if (!createdTrade) return null
    return createdTrade
}
