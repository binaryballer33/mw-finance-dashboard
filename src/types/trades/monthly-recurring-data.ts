import type { MonthlyRecurring } from "@prisma/client"

/*
 * avgProfitLoss - the average profit or loss from your trades
 * expenses - the array of monthly recurring expenses
 * expensesTotal - the monthly recurring expenses total amount
 * incomes - the array of monthly recurring incomes
 * incomesTotal - the monthly recurring incomes total amount
 */
export type MonthlyRecurringData = {
    /* the average profit or loss from your trades */
    avgProfitLoss: number

    /* the array of monthly recurring expenses */
    expenses: MonthlyRecurring[]

    /* the monthly recurring expenses total amount */
    expensesTotal: number

    /* the array of monthly recurring incomes */
    incomes: MonthlyRecurring[]

    /* the monthly recurring incomes total amount */
    incomesTotal: number
}

/* The Monthly Expenses information, expenses and expenses total */
export type MonthlyExpensesData = Pick<MonthlyRecurringData, "expenses" | "expensesTotal">

/* The Monthly Incomes information, incomes and incomes total */
export type MonthlyIncomesData = Pick<MonthlyRecurringData, "incomes" | "incomesTotal">
