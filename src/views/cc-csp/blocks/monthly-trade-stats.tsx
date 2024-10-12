import type { MonthlyTradeData } from "src/types/trades/monthly-trade-data"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

import { Box, Typography } from "@mui/material"

dayjs.extend(customParseFormat)

type MonthlyTotalsProps = {
    monthlyTradeData: MonthlyTradeData[]
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
                .sort((currentMonth, nextMonth) => {
                    const firstMonth = dayjs(currentMonth.monthYearOfTrade, "MM-YYYY").format("MMM")
                    const secondMonth = dayjs(nextMonth.monthYearOfTrade, "MM-YYYY").format("MMM")
                    return months[firstMonth] - months[secondMonth]
                })
                .map((monthlyItem) => {
                    const { monthYearOfTrade, total, tradeCount } = monthlyItem

                    return (
                        <Box display="flex" flexDirection="row" gap={2} key={monthYearOfTrade}>
                            <Typography variant="body1">
                                {dayjs(monthYearOfTrade, "MM-YYYY").format("MMM YYYY")}
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
