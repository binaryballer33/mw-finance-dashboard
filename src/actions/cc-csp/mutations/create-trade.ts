import type { PrismaClient, Trade } from "@prisma/client"
import type { DefaultArgs } from "@prisma/client/runtime/binary"

import { Prisma } from "@prisma/client"

import convertToFloat from "src/utils/helper-functions/convertToFloat"

import PrismaClientOptions = Prisma.PrismaClientOptions

type CreateParams = {
    db: Omit<
        PrismaClient<PrismaClientOptions, never, DefaultArgs>,
        "$connect" | "$disconnect" | "$extends" | "$on" | "$transaction" | "$use"
    >
    monthlyTradeId: string
    tickerTradeId: string
    trade: Trade
    weeklyTradeId: string
}

export default async function createTrade(params: CreateParams) {
    const { db, monthlyTradeId, tickerTradeId, trade, weeklyTradeId } = params
    const profitLossPercentage = convertToFloat(100 - (trade.buyToClose / trade.sellToOpen) * 100)

    try {
        return await db.trade.create({
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
}
