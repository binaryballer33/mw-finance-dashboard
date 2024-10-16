import type { Trade } from "@prisma/client"

import { useQuery } from "@tanstack/react-query"

import getCcCspTrades from "src/actions/cc-csp/queries/get-cc-csp-trades"

import queryKeys from "src/api/query-keys"

export default function useGetTradesQuery(page?: number, limit?: number) {
    return useQuery<Trade[]>({
        queryFn: async () => (await getCcCspTrades(page, limit)) ?? [],
        queryKey: queryKeys.trades,
    })
}
