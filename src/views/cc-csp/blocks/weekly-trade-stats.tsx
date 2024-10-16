import type { WeeklyTrade } from "@prisma/client"

import { Box, Typography } from "@mui/material"

import convertToFloat from "src/utils/helper-functions/convertToFloat"
import getDayJsDateWithPlugins from "src/utils/helper-functions/dates/get-day-js-date-with-plugins"

import HiddenOnScreen from "src/components/hidden-on-screen"

type WeeklyTotalsProps = {
    weeklyTradeData: WeeklyTrade[]
}

export default function WeeklyTradeStats(props: WeeklyTotalsProps) {
    const { weeklyTradeData } = props

    return (
        <Box minWidth={290} sx={{ overflow: "scroll" }}>
            <Typography color="#8B8000" variant="h5">
                Weekly Totals
            </Typography>

            {/* Weekly Trade Data Rows */}
            {weeklyTradeData.map((weeklyItem) => {
                const { endDate, startDate, total, tradeCount, week, year } = weeklyItem
                const startDateFormatted = getDayJsDateWithPlugins(startDate).format("ddd MMM DD, YYYY")
                const endDateFormatted = getDayJsDateWithPlugins(endDate).format("ddd MMM DD, YYYY")
                const tradingWeekString = `${startDateFormatted} - ${endDateFormatted}`

                return (
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap={3}
                        justifyContent={{ md: "space-between", xs: "flex-start" }}
                        key={`${week}-${year}`}
                    >
                        <Typography variant="body1">
                            Week: {week} <HiddenOnScreen size="xs" sizeToShow="md" title={tradingWeekString} />
                        </Typography>
                        <Typography color="success" variant="body1">
                            ${convertToFloat(total)}
                        </Typography>
                        <Typography variant="body1">{tradeCount} Trades</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}
