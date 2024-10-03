import type { Trade } from "@prisma/client"

import fs from "fs"

import prisma from "src/utils/database/prisma"

import routes from "src/routes/routes"

async function dropTables() {
    // delete in proper order
    console.warn("Attempting To Drop Tables")

    await prisma.trade.deleteMany({})

    console.log("Dropped Tables Successfully\n")
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
        const trades = JSON.parse(fs.readFileSync(routes.coveredCallCashSecuredPutData, "utf-8"))

        // delete all records in the tables so you can start fresh and avoid any unique constraint violations when inserting records
        await dropTables()

        // wait for tables to be dropped
        await new Promise((resolve) => setTimeout(resolve, 3000))

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
