"use server"

import type { MonthlyRecurring } from "@prisma/client"

import prisma from "src/utils/database/prisma"

export default async function getMonthlyRecurring(): Promise<MonthlyRecurring[] | null> {
    try {
        return await prisma.monthlyRecurring.findMany({
            orderBy: { amount: "desc" },
        })
    } catch (error) {
        console.error(`Error Fetching Monthly Recurring: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
