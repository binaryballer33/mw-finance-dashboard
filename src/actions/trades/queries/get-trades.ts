"use server"

import type { Trade } from "@prisma/client"

import prisma from "src/utils/database/prisma"

export default async function getTrades(page = 0, limit = 50): Promise<null | Trade[]> {
    const skipPreviousRecords = page * limit

    try {
        return await prisma.trade.findMany({
            orderBy: { date: "desc" },
            skip: skipPreviousRecords,
            take: limit,
        })
    } catch (error) {
        console.error(`Error Fetching Trades: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
