import type { PrismaClient, Trade } from "@prisma/client"
import type { DefaultArgs } from "@prisma/client/runtime/binary"

import { Prisma } from "@prisma/client"

import PrismaClientOptions = Prisma.PrismaClientOptions

type UpsertParams = {
    date: {
        endDate: string
        month: number
        startDate: string
        week: number
        year: number
    }
    db: Omit<
        PrismaClient<PrismaClientOptions, never, DefaultArgs>,
        "$connect" | "$disconnect" | "$extends" | "$on" | "$transaction" | "$use"
    >
    monthlyTradeId: string
    trade: Trade
}

export default async function upsertWeeklyTrade(params: UpsertParams) {
    const { date, db, monthlyTradeId, trade } = params
    const { endDate, startDate, week, year } = date

    try {
        return await db.weeklyTrade.upsert({
            create: {
                endDate,
                monthlyTradeId,
                startDate,
                total: trade.profitLoss,
                tradeCount: 1,
                week,
                year,
            },
            update: {
                total: {
                    increment: trade.profitLoss,
                },
                tradeCount: {
                    increment: 1,
                },
            },
            where: { week_year: { week, year } },
        })
    } catch (error) {
        console.error(`Error Creating / Updating Weekly Trade ${week}-${year}: ${error}`)
        return null
    }
}
