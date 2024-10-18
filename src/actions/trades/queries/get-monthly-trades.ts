"use server"

import type { MonthlyTrade } from "@prisma/client"

import prisma from "src/utils/database/prisma"

export default async function getMonthlyTrades(page = 0, limit = 50): Promise<MonthlyTrade[] | null> {
    const skipPreviousRecords = page * limit

    try {
        return await prisma.monthlyTrade.findMany({
            orderBy: { month: "desc" },
            skip: skipPreviousRecords,
            take: limit,
        })
    } catch (error) {
        console.error(`Error Fetching Monthly Trades: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
