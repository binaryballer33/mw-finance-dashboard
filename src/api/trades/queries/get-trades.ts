import type { Trade } from "@prisma/client"

import { useQuery } from "@tanstack/react-query"

import getTrades from "src/actions/trades/queries/get-trades"

import queryKeys from "src/api/query-keys"

export default function useGetTradesQuery(page?: number, limit?: number) {
    return useQuery<Trade[]>({
        queryFn: async () => (await getTrades(page, limit)) ?? [],
        queryKey: queryKeys.trades,
    })
}
