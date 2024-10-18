"use server"

import type {
    MonthlyRecurring as MonthlyRecurringItem,
    MonthlyTrade,
    TickerTrade,
    Trade,
    WeeklyTrade,
    YearlyRecurring as YearlyRecurringItem,
} from "@prisma/client"
import type { MonthlyRecurringData } from "src/types/trades/monthly-recurring-data"
import type { TradeData } from "src/types/trades/trade-data"
import type { YearlyRecurringData } from "src/types/trades/yearly-recurring-data"

import { dehydrate } from "@tanstack/react-query"

import CoveredCallCashSecuredPutCalculator from "src/utils/calculators/cc-csp-calculator"
import RecurringIncomeExpenseCalculator from "src/utils/calculators/recurring-income-expense-calculator"

import getMonthlyRecurring from "src/actions/monthly-recurring/get-monthly-recurring"
import getMonthlyTrades from "src/actions/trades/queries/get-monthly-trades"
import getTickerTrades from "src/actions/trades/queries/get-ticker-trades"
import getTrades from "src/actions/trades/queries/get-trades"
import getWeeklyTrades from "src/actions/trades/queries/get-weekly-trades"
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

    // prefetch the monthly recurring incomes and expenses and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getMonthlyRecurring()) ?? [],
        queryKey: queryKeys.monthlyRecurring,
    })

    // prefetch the yearly recurring incomes and expenses and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getYearlyRecurring()) ?? [],
        queryKey: queryKeys.yearlyRecurring,
    })

    // prefetch all trades trades and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getTrades()) ?? [],
        queryKey: queryKeys.trades,
    })

    // prefetch all monthly trades and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getMonthlyTrades()) ?? [],
        queryKey: queryKeys.monthlyTrades,
    })

    // prefetch all weekly trades and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getWeeklyTrades()) ?? [],
        queryKey: queryKeys.weeklyTrades,
    })

    // prefetch all ticker trades and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getTickerTrades()) ?? [],
        queryKey: queryKeys.tickerTrades,
    })

    // get the trade data from the cache and return them in case a component needs them
    const trades = queryClient.getQueryData<Trade[]>(queryKeys.trades)
    const monthlyTrades = queryClient.getQueryData<MonthlyTrade[]>(queryKeys.monthlyTrades)
    const weeklyTrades = queryClient.getQueryData<WeeklyTrade[]>(queryKeys.weeklyTrades)
    const tickerTrades = queryClient.getQueryData<TickerTrade[]>(queryKeys.tickerTrades)
    const tradeData = new CoveredCallCashSecuredPutCalculator(trades!).getTradeAverages()

    // get the recurring income and expense data from the cache and return them in case a component needs them
    const monthlyRecurring = queryClient.getQueryData<MonthlyRecurringItem[]>(queryKeys.monthlyRecurring)
    const yearlyRecurring = queryClient.getQueryData<YearlyRecurringItem[]>(queryKeys.yearlyRecurring)
    const recurringIncomeExpenseCalculator = new RecurringIncomeExpenseCalculator(monthlyRecurring!, yearlyRecurring!)
    const monthlyRecurringData = recurringIncomeExpenseCalculator.getMonthlyRecurringData()
    const yearlyRecurringData = recurringIncomeExpenseCalculator.getYearlyRecurringData()

    /* create return objects */
    const monthlyRecurringDataCalculated: MonthlyRecurringData = {
        avgProfitLoss: tradeData.avgMonthlyProfitLoss,
        expenses: monthlyRecurringData.expenses,
        expensesTotal: monthlyRecurringData.expensesTotal,
        incomes: monthlyRecurringData.incomes,
        incomesTotal: monthlyRecurringData.incomesTotal,
    }

    const yearlyRecurringDataCalculated: YearlyRecurringData = {
        expenses: yearlyRecurringData.expenses,
        expensesTotal: yearlyRecurringData.expensesTotal,
        incomes: yearlyRecurringData.incomes,
        incomesTotal: yearlyRecurringData.incomesTotal,
    }

    const tradeDataCalculated: TradeData = {
        allTimeTotal: tradeData.allTimeTotal,
        avgMonthlyProfitLoss: tradeData.avgMonthlyProfitLoss,
        avgTradeProfitLoss: tradeData.avgTradeProfitLoss,
        avgWeeklyProfitLoss: tradeData.avgWeeklyProfitLoss,
        monthlyTradeData: monthlyTrades!,
        tickerTradeData: tickerTrades!,
        weeklyTradeData: weeklyTrades!,
    }

    return {
        // return the dehydrated state of the queryClient and the trades from the cache
        dehydratedState: dehydrate(queryClient),
        monthlyRecurring: monthlyRecurringDataCalculated,
        tradeData: tradeDataCalculated,
        yearlyRecurring: yearlyRecurringDataCalculated,
    }
}
