import type { MonthlyRecurring as MonthlyRecurringItem } from "@prisma/client"
import type { MonthlyRecurringData } from "src/types/trades/monthly-recurring-data"
import type { YearlyRecurringData } from "src/types/trades/yearly-recurring-data"

import { randomUUID } from "node:crypto"

import dayjs from "dayjs"

import { Container, Typography } from "@mui/material"

import convertToFloat from "src/utils/helper-functions/convertToFloat"

import getMonthlyTrades from "src/actions/trades/queries/get-monthly-trades"

import FlexBetweenContainer from "src/components/flex-box/flex-between-container"
import FlexContainer from "src/components/flex-box/flex-container"

import MonthlyRecurring from "src/views/recurring-expenses/blocks/monthly-recurring"
import YearlyRecurring from "src/views/recurring-expenses/blocks/yearly-recurring"

type RecurringExpensesProps = {
    monthlyRecurring: MonthlyRecurringData
    yearlyRecurring: YearlyRecurringData
}

export default async function RecurringFinances(props: RecurringExpensesProps) {
    const { monthlyRecurring, yearlyRecurring } = props

    const netMonthlyOperatingBudget = convertToFloat(
        monthlyRecurring.incomesTotal - monthlyRecurring.expensesTotal + monthlyRecurring.avgProfitLoss,
    )

    const today = dayjs()

    return (
        <Container maxWidth="xl">
            <FlexContainer my={5}>
                <Typography color="#8B8000" variant="h5">
                    Net Monthly Operating Budget
                </Typography>
                <Typography color="success" variant="h5">
                    {netMonthlyOperatingBudget}
                </Typography>
            </FlexContainer>

            <FlexBetweenContainer marginY={10} stackOn="desktop">
                <MonthlyRecurring
                    monthlyRecurring={await addOtherIncomes(monthlyRecurring)}
                    today={today}
                    type="INCOME"
                />
                <YearlyRecurring today={today} type="INCOME" yearlyRecurring={yearlyRecurring.incomes} />
            </FlexBetweenContainer>

            <FlexContainer stackOn="desktop">
                <MonthlyRecurring monthlyRecurring={monthlyRecurring.expenses} today={today} type="EXPENSE" />
                <YearlyRecurring today={today} type="EXPENSE" yearlyRecurring={yearlyRecurring.expenses} />
            </FlexContainer>
        </Container>
    )
}

/* add any other additional incomes to the monthly recurring incomes array */
async function addOtherIncomes(monthlyRecurring: MonthlyRecurringData) {
    const monthlyTrades = await getMonthlyTrades()
    let currentMonthSellOptionsIncome = 0
    if (!monthlyTrades) currentMonthSellOptionsIncome = monthlyRecurring.avgProfitLoss
    else currentMonthSellOptionsIncome = monthlyTrades[0].total

    const additionalMonthlyIncome = {
        amount: currentMonthSellOptionsIncome,
        category: "Investments",
        createdAt: dayjs("10-10-2024").toDate(),
        dueDayOfMonth: "01",
        id: randomUUID(),
        name: "Average Monthly Profits CC CSP",
        type: "INCOME",
        updatedAt: dayjs("10-10-2024").toDate(),
    } satisfies MonthlyRecurringItem
    monthlyRecurring.incomes.push(additionalMonthlyIncome)
    return monthlyRecurring.incomes
}
