import type { YearlyRecurring } from "@prisma/client"

/*
 * expenses - the array of yearly recurring expenses
 * expensesTotal - the yearly recurring expenses total amount
 * incomes - the array of yearly recurring incomes
 * incomesTotal - the yearly recurring incomes total amount
 */
export type YearlyRecurringData = {
    /* the array of yearly recurring expenses */
    expenses: YearlyRecurring[]

    /* the yearly recurring expenses total amount */
    expensesTotal: number

    /* the array of yearly recurring incomes */
    incomes: YearlyRecurring[]

    /* the yearly recurring incomes total amount */
    incomesTotal: number
}

/* The Yearly Expenses information, expenses and expenses total */
export type YearlyExpensesData = Pick<YearlyRecurringData, "expenses" | "expensesTotal">

/* The Yearly Incomes information, incomes and incomes total */
export type YearlyIncomesData = Pick<YearlyRecurringData, "incomes" | "incomesTotal">
