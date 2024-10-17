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
    dbClient: Omit<
        PrismaClient<PrismaClientOptions, never, DefaultArgs>,
        "$connect" | "$disconnect" | "$extends" | "$on" | "$transaction" | "$use"
    >
    trade: Trade
}

export default async function upsertMonthlyTrade(params: UpsertParams) {
    const { date, dbClient, trade } = params
    const { month, year } = date

    try {
        return await dbClient.monthlyTrade.upsert({
            create: {
                month,
                total: trade.profitLoss,
                tradeCount: 1,
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
            where: { month_year: { month, year } },
        })
    } catch (error) {
        console.error(`Error Creating / Updating Monthly Trade ${month}-${year}: ${error}`)
        return null
    }
}
