"use server"

import type {
    MonthlyRecurring as MonthlyRecurringItem,
    Trade,
    YearlyRecurring as YearlyRecurringItem,
} from "@prisma/client"
import type { MonthlyRecurringData } from "src/types/trades/monthly-recurring-data"
import type { TradeData } from "src/types/trades/trade-data"
import type { YearlyRecurringData } from "src/types/trades/yearly-recurring-data"

import { dehydrate } from "@tanstack/react-query"

import CoveredCallCashSecuredPutCalculator from "src/utils/calculators/cc-csp-calculator"
import RecurringIncomeExpenseCalculator from "src/utils/calculators/recurring-income-expense-calculator"

import getCcCspTrades from "src/actions/cc-csp/get-cc-csp-trades"
import getMonthlyRecurring from "src/actions/monthly-recurring/get-monthly-recurring"
import getYearlyRecurring from "src/actions/yearly-recurring/get-yearly-recurring"

import createServerComponentQueryClient from "src/api/query-client-server-component"
import queryKeys from "src/api/query-keys"

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchHomePageDataDehydrateState() {
    const queryClient = await createServerComponentQueryClient() // need to create a new queryClient for each request for server components

    // prefetch all trades / finance data and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getCcCspTrades()) ?? [],
        queryKey: queryKeys.trades,
    })

    await queryClient.prefetchQuery({
        queryFn: async () => (await getMonthlyRecurring()) ?? [],
        queryKey: queryKeys.monthlyRecurring,
    })

    await queryClient.prefetchQuery({
        queryFn: async () => (await getYearlyRecurring()) ?? [],
        queryKey: queryKeys.yearlyRecurring,
    })

    // get the data from the cache and return them in case a component needs them
    const trades = queryClient.getQueryData<Trade[]>(queryKeys.trades)
    const monthlyRecurring = queryClient.getQueryData<MonthlyRecurringItem[]>(queryKeys.monthlyRecurring)
    const yearlyRecurring = queryClient.getQueryData<YearlyRecurringItem[]>(queryKeys.yearlyRecurring)

    // get the covered calls and cash secured put stocks trading data
    const tradeData = new CoveredCallCashSecuredPutCalculator(trades!).getAllTradeData()

    // get the recurring income and expense data
    const recurringIncomeExpenseCalculator = new RecurringIncomeExpenseCalculator(monthlyRecurring!, yearlyRecurring!)
    const monthlyRecurringData = recurringIncomeExpenseCalculator.getMonthlyRecurringData()
    const yearlyRecurringData = recurringIncomeExpenseCalculator.getYearlyRecurringData()

    return {
        // return the dehydrated state of the queryClient and the trades from the cache
        dehydratedState: dehydrate(queryClient),
        monthlyRecurring: {
            avgProfitLoss: tradeData.avgMonthlyProfitLoss,
            expenses: monthlyRecurringData.expenses,
            expensesTotal: monthlyRecurringData.expensesTotal,
            incomes: monthlyRecurringData.incomes,
            incomesTotal: monthlyRecurringData.incomesTotal,
        } satisfies MonthlyRecurringData,
        tradeData: {
            allTimeTotal: tradeData.allTimeTotal,
            avgMonthlyProfitLoss: tradeData.avgMonthlyProfitLoss,
            monthlyTradeData: tradeData.monthlyTradeData,
            tickerTradeData: tradeData.tickerTradeData,
            weeklyTradeData: tradeData.weeklyTradeData,
        } satisfies TradeData,
        yearlyRecurring: {
            expenses: yearlyRecurringData.expenses,
            expensesTotal: yearlyRecurringData.expensesTotal,
            incomes: yearlyRecurringData.incomes,
            incomesTotal: yearlyRecurringData.incomesTotal,
        } satisfies YearlyRecurringData,
    }
}
