import type { Metadata } from "next"

import { HydrationBoundary } from "@tanstack/react-query"

import prefetchHomePageDataDehydrateState from "src/app/prefetch-home-page-data"
import CoveredCallsCashSecuredPutsProfits from "src/views/cc-csp/cc-csp"

export const metadata: Metadata = {
    description: "Home Page - Practicing Working With Trade Data",
    title: "Home |  MW - Finance Dashboard",
}

export default async function Home() {
    const { dehydratedState, trades = [] } = await prefetchHomePageDataDehydrateState()

    return (
        <HydrationBoundary state={dehydratedState}>
            <CoveredCallsCashSecuredPutsProfits trades={trades} />
        </HydrationBoundary>
    )
}
