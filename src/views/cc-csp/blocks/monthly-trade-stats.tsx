import type { MonthlyTrade } from "@prisma/client"

import dayjs from "dayjs"

import { Box, Typography } from "@mui/material"

import getDayJsDateWithPlugins from "src/utils/helper-functions/dates/get-day-js-date-with-plugins"

type MonthlyTotalsProps = {
    monthlyTradeData: MonthlyTrade[]
}

export default function MonthlyTradeStats(props: MonthlyTotalsProps) {
    const { monthlyTradeData } = props

    const months = { Apr: 4, Aug: 8, Dec: 12, Feb: 2, Jan: 1, Jul: 7, Jun: 6, Mar: 3, May: 5, Nov: 11, Oct: 10, Sep: 9 }

    return (
        <Box>
            <Typography color="#8B8000" variant="h5">
                Monthly Totals
            </Typography>
            {monthlyTradeData
                // sort by month order
                .sort((m1, m2) => {
                    const firstMonth = getDayJsDateWithPlugins(`${m1.month}-${m1.year}`, "M-YYYY").format("MMM")
                    const secondMonth = getDayJsDateWithPlugins(`${m2.month}-${m2.year}`, "M-YYYY").format("MMM")
                    return months[secondMonth] - months[firstMonth]
                })
                .map((monthlyItem) => {
                    const { month, total, tradeCount, year } = monthlyItem
                    const monthYearOfTrade = `${month}-${year}`

                    return (
                        <Box display="flex" flexDirection="row" gap={2} key={monthYearOfTrade}>
                            <Typography variant="body1">
                                {dayjs(monthYearOfTrade, "M-YYYY").format("MMM YYYY")}
                            </Typography>
                            <Typography color="success" variant="body1">
                                ${total}
                            </Typography>
                            <Typography variant="body1"> {tradeCount.toString().padStart(2)} Trades</Typography>
                        </Box>
                    )
                })}
        </Box>
    )
}
