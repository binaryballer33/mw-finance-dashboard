"use server"

import type { TickerTrade } from "@prisma/client"

import prisma from "src/utils/database/prisma"

export default async function getTickerTrades(page = 0, limit = 50): Promise<null | TickerTrade[]> {
    const skipPreviousRecords = page * limit

    try {
        return await prisma.tickerTrade.findMany({
            include: { trades: true },
            orderBy: { total: "desc" },
            skip: skipPreviousRecords,
            take: limit,
        })
    } catch (error) {
        console.error(`Error Fetching Ticker Trades: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
