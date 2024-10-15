import type { MonthlyRecurring, Trade, YearlyRecurring } from "@prisma/client"

import fs from "fs"

import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"

import prisma from "src/utils/database/prisma"

import routes from "src/routes/routes"

dayjs.extend(weekOfYear)

async function dropTables() {
    // delete in proper order
    console.warn("Attempting To Drop Tables")

    await prisma.trade.deleteMany({})
    await prisma.weeklyTrade.deleteMany({})
    await prisma.monthlyTrade.deleteMany({})
    await prisma.tickerTrade.deleteMany({})
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

async function batchCreateAllTrades(trades: Trade[]) {
    console.log("Attempting To Create Trades And Weekly Trades")

    const createdTrades = await prisma.$transaction(async (db) => {
        return await Promise.all(
            trades.map(async (trade) => {
                const dateOfTheTrade = dayjs(trade.date)
                const weekOfTheYear = dateOfTheTrade.week()
                // the month that the trade occurred ( value returned from dayjs is zero based )
                const monthYearOfTrade = `${dateOfTheTrade.month() + 1}-${dateOfTheTrade.year()}`
                // the end of the trading week ( friday ) and the start of the trading week ( monday )
                const endDate = dateOfTheTrade.format("MM-DD-YYYY")
                const startDate = dateOfTheTrade.subtract(4, "day").format("MM-DD-YYYY")

                // create the MonthlyTrade or update it, if it already exists
                const createdMonthlyTrade = await db.monthlyTrade.upsert({
                    create: {
                        monthYearOfTrade,
                        total: trade.profitLoss,
                        tradeCount: 1,
                    },
                    update: {
                        total: {
                            increment: trade.profitLoss,
                        },
                        tradeCount: {
                            increment: 1,
                        },
                    },
                    where: { monthYearOfTrade },
                })

                // create the WeeklyTrade or update it, if it already exists
                const createdWeeklyTrade = await db.weeklyTrade.upsert({
                    create: {
                        endDate,
                        monthlyTradeId: createdMonthlyTrade.id,
                        startDate,
                        total: trade.profitLoss,
                        tradeCount: 1,
                        weekOfTheYear,
                    },
                    update: {
                        total: {
                            increment: trade.profitLoss,
                        },
                        tradeCount: {
                            increment: 1,
                        },
                    },
                    where: { weekOfTheYear },
                })

                // create the TickerTrade or update it, if it already exists
                const createdTickerTrade = await db.tickerTrade.upsert({
                    create: {
                        ticker: trade.ticker,
                        total: trade.profitLoss,
                        tradeCount: 1,
                    },
                    update: {
                        total: {
                            increment: trade.profitLoss,
                        },
                        tradeCount: {
                            increment: 1,
                        },
                    },
                    where: { ticker: trade.ticker },
                })

                // create the Trade and associate it with the correct WeeklyTrade
                const createdTrade = await db.trade.create({
                    data: {
                        date: trade.date,
                        monthlyTradeId: createdMonthlyTrade.id,
                        profitLoss: trade.profitLoss,
                        realized: trade.realized,
                        strike: trade.strike,
                        ticker: trade.ticker,
                        tickerTradeId: createdTickerTrade.id,
                        type: trade.type,
                        weeklyTradeId: createdWeeklyTrade.id,
                    },
                })

                return {
                    monthlyTrade: createdMonthlyTrade,
                    tickerTrade: createdTickerTrade,
                    trade: createdTrade,
                    weeklyTrade: createdWeeklyTrade,
                }
            }),
        )
    })

    console.log(`Successfully Inserted ${createdTrades.length} Records To Trades Table\n`)

    return createdTrades
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
        await batchCreateAllTrades(trades)
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

seedDatabase()
    .then((_) => console.log("Successfully Seeded Database"))
    .catch((e) => console.error("Error Seeding Database", e))
