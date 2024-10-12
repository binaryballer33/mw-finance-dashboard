import type { YearlyRecurring } from "@prisma/client"

import { useQuery } from "@tanstack/react-query"

import getYearlyRecurring from "src/actions/yearly-recurring/get-yearly-recurring"

import queryKeys from "src/api/query-keys"

export default function useGetYearlyRecurringQuery() {
    return useQuery<YearlyRecurring[]>({
        queryFn: async () => (await getYearlyRecurring()) ?? [],
        queryKey: queryKeys.yearlyRecurring,
    })
}
