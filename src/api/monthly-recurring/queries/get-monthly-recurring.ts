import type { MonthlyRecurring } from "@prisma/client"

import { useQuery } from "@tanstack/react-query"

import getMonthlyRecurring from "src/actions/monthly-recurring/get-monthly-recurring"

import queryKeys from "src/api/query-keys"

export default function useGetMonthlyRecurringQuery() {
    return useQuery<MonthlyRecurring[]>({
        queryFn: async () => (await getMonthlyRecurring()) ?? [],
        queryKey: queryKeys.monthlyRecurring,
    })
}
