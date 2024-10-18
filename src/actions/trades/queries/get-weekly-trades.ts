"use server"

import type { WeeklyTrade } from "@prisma/client"

import prisma from "src/utils/database/prisma"

export default async function getWeeklyTrades(page = 0, limit = 50): Promise<null | WeeklyTrade[]> {
    const skipPreviousRecords = page * limit

    try {
        return await prisma.weeklyTrade.findMany({
            include: { trades: true },
            orderBy: { week: "desc" },
            skip: skipPreviousRecords,
            take: limit,
        })
    } catch (error) {
        console.error(`Error Fetching Weekly Trades: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
