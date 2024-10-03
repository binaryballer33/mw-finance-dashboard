"use server"

import type { Trade } from "@prisma/client"

import { dehydrate } from "@tanstack/react-query"

import getCcCspTrades from "src/actions/cc-csp/get-cc-csp-trades"

import createServerComponentQueryClient from "src/api/query-client-server-component"
import queryKeys from "src/api/query-keys"

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchHomePageDataDehydrateState() {
    const queryClient = await createServerComponentQueryClient() // need to create a new queryClient for each request for server components

    // prefetch all trades and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getCcCspTrades()) ?? [],
        queryKey: queryKeys.trades,
    })

    // get the trades from the cache and return them in case a component needs them
    const trades = queryClient.getQueryData<Trade[]>(queryKeys.trades)

    return {
        // return the dehydrated state of the queryClient and the trades from the cache
        dehydratedState: dehydrate(queryClient),
        trades,
    }
}
