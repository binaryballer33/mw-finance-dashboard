import type { MonthlyRecurring, Trade, YearlyRecurring } from "@prisma/client"

import fs from "fs"

import prisma from "src/utils/database/prisma"

import routes from "src/routes/routes"

async function dropTables() {
    // delete in proper order
    console.warn("Attempting To Drop Tables")

    await prisma.trade.deleteMany({})
    await prisma.monthlyRecurring.deleteMany({})
    await prisma.yearlyRecurring.deleteMany({})

    console.log("Dropped Tables Successfully\n")
}

async function batchCreateMonthlyRecurring(monthlyRecurring: MonthlyRecurring[]) {
    console.log("Attempting To Create Monthly Recurring")

    try {
        const result = await prisma.monthlyRecurring.createMany({
            data: monthlyRecurring,
            skipDuplicates: true,
        })
        console.log(`Successfully Inserted ${result.count} Records To Monthly Recurring Table\n`)
    } catch (error) {
        console.error(`Error While Inserting Records To Monthly Recurring Table`, error)
    }
}

async function batchCreateYearlyRecurring(yearlyRecurring: YearlyRecurring[]) {
    console.log("Attempting To Create Yearly Recurring")

    try {
        const result = await prisma.yearlyRecurring.createMany({
            data: yearlyRecurring,
            skipDuplicates: true,
        })
        console.log(`Successfully Inserted ${result.count} Records To Yearly Recurring Table\n`)
    } catch (error) {
        console.error(`Error While Inserting Records To Yearly Recurring Table`, error)
    }
}

async function batchCreateTrades(trades: Trade[]) {
    console.log("Attempting To Create Trades")

    try {
        const result = await prisma.trade.createMany({
            data: trades,
            skipDuplicates: true, // Optional: skips inserting records that would cause a unique constraint violation
        })
        console.log(`Successfully Inserted ${result.count} Records To Trades Table\n`)
    } catch (error) {
        console.error(`Error While Inserting Records To Trades Table`, error)
    }
}

async function seedDatabase() {
    try {
        const trades: Trade[] = JSON.parse(fs.readFileSync(routes.coveredCallCashSecuredPutData, "utf-8"))
        const { monthlyRecurring, yearlyRecurring } = JSON.parse(fs.readFileSync(routes.recurringExpenses, "utf-8"))

        // delete all records in the tables so you can start fresh and avoid any unique constraint violations when inserting records
        await dropTables()

        // wait for tables to be dropped
        await new Promise((resolve) => setTimeout(resolve, 3000))

        await batchCreateMonthlyRecurring(monthlyRecurring)
        await batchCreateYearlyRecurring(yearlyRecurring)
        await batchCreateTrades(trades)
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

seedDatabase()
    .then((_) => console.log("Successfully Seeded Database"))
    .catch((e) => console.error("Error Seeding Database", e))
