import type { PrismaClient, Trade } from "@prisma/client"
import type { DefaultArgs } from "@prisma/client/runtime/binary"

import { Prisma } from "@prisma/client"

import PrismaClientOptions = Prisma.PrismaClientOptions

type UpsertParams = {
    db: Omit<
        PrismaClient<PrismaClientOptions, never, DefaultArgs>,
        "$connect" | "$disconnect" | "$extends" | "$on" | "$transaction" | "$use"
    >
    trade: Trade
}

export default async function upsertTickerTrade(params: UpsertParams) {
    const { db, trade } = params

    try {
        return await db.tickerTrade.upsert({
            create: {
                ticker: trade.ticker,
                total: trade.profitLoss,
                tradeCount: 1,
            },
            update: {
                total: {
                    increment: trade.profitLoss,
                },
                tradeCount: {
                    increment: 1,
                },
            },
            where: { ticker: trade.ticker },
        })
    } catch (error) {
        console.error(`Error Creating / Updating Ticker Trade ${trade.ticker}: ${error}`)
        return null
    }
}
