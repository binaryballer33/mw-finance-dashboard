import type { Metadata } from "next"

import { HydrationBoundary } from "@tanstack/react-query"

import prefetchHomePageDataDehydrateState from "src/app/prefetch-home-page-data"
import CoveredCallsCashSecuredPutsProfits from "src/views/cc-csp/cc-csp"
import RecurringFinances from "src/views/recurring-expenses/recurring-finances"

export const metadata: Metadata = {
    description: "Home Page - Practicing Working With Trade Data",
    title: "Home |  MW - Finance Dashboard",
}

export default async function Home() {
    const cache = await prefetchHomePageDataDehydrateState()
    const { dehydratedState, monthlyRecurring, tradeData, yearlyRecurring } = cache

    return (
        <HydrationBoundary state={dehydratedState}>
            <CoveredCallsCashSecuredPutsProfits tradeData={tradeData} />
            <RecurringFinances monthlyRecurring={monthlyRecurring} yearlyRecurring={yearlyRecurring} />
        </HydrationBoundary>
    )
}
