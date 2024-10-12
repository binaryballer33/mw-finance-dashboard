import type { MonthlyRecurring as MonthlyRecurringItem } from "@prisma/client"
import type { MonthlyRecurringData } from "src/types/trades/monthly-recurring-data"
import type { YearlyRecurringData } from "src/types/trades/yearly-recurring-data"

import { randomUUID } from "node:crypto"

import dayjs from "dayjs"

import { Container } from "@mui/material"

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

    // TODO: fix this crazy shit later
    const additionalMonthlyIncome = {
        amount: monthlyRecurring.avgProfitLoss,
        category: "Investments",
        createdAt: dayjs("10-10-2024").toDate(),
        dueDayOfMonth: "01",
        id: randomUUID(),
        name: "Average Monthly Profits CC CSP",
        type: "INCOME",
        updatedAt: dayjs("10-10-2024").toDate(),
    } satisfies MonthlyRecurringItem
    monthlyRecurring.incomes.push(additionalMonthlyIncome)

    const today = dayjs()

    return (
        <Container maxWidth="xl">
            <FlexBetweenContainer marginY={10} stackOn="desktop">
                <MonthlyRecurring monthlyRecurring={monthlyRecurring.incomes} today={today} type="INCOME" />
                <YearlyRecurring today={today} type="INCOME" yearlyRecurring={yearlyRecurring.incomes} />
            </FlexBetweenContainer>

            <FlexContainer stackOn="desktop">
                <MonthlyRecurring monthlyRecurring={monthlyRecurring.expenses} today={today} type="EXPENSE" />
                <YearlyRecurring today={today} type="EXPENSE" yearlyRecurring={yearlyRecurring.expenses} />
            </FlexContainer>
        </Container>
    )
}
