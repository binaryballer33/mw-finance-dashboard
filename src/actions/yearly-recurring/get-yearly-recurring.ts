"use server"

import type { YearlyRecurring } from "@prisma/client"

import prisma from "src/utils/database/prisma"

export default async function getYearlyRecurring(): Promise<null | YearlyRecurring[]> {
    try {
        return await prisma.yearlyRecurring.findMany({
            orderBy: { amount: "desc" },
        })
    } catch (error) {
        console.error(`Error Fetching Yearly Recurring: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
