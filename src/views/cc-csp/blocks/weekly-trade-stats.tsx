import type { WeeklyTradeData } from "src/types/trades/weekly-trade-data"

import dayjs from "dayjs"

import { Box, Typography } from "@mui/material"

import HiddenOnScreen from "src/components/hidden-on-screen"

type WeeklyTotalsProps = {
    weeklyTradeData: WeeklyTradeData[]
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
                const { endDate, startDate, total, tradeCount, weekOfTheYear } = weeklyItem

                const startDateFormatted = dayjs(startDate).format("ddd MMM DD, YYYY")
                const endDateFormatted = dayjs(endDate).format("ddd MMM DD, YYYY")
                const tradingWeekString = `${startDateFormatted} - ${endDateFormatted}`

                return (
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap={3}
                        justifyContent={{ md: "space-between", xs: "flex-start" }}
                        key={weekOfTheYear}
                    >
                        <Typography variant="body1">
                            Week: {weekOfTheYear} <HiddenOnScreen size="xs" sizeToShow="md" title={tradingWeekString} />
                        </Typography>
                        <Typography color="success" variant="body1">
                            ${total}
                        </Typography>
                        <Typography variant="body1">{tradeCount} Trades</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}
