import type { Trade } from "@prisma/client"
import type { WeeklyTradeData } from "src/types/trades/weekly-trade-data"

import { Box, Container, Stack, Typography } from "@mui/material"

import CC_CSP_CALCULATOR from "src/utils/calculators/cc-csp-calculator"
import { months } from "src/utils/constants"

type CoveredCallsCashSecuredPutsProfitsProps = {
    trades: Trade[]
}

export default async function CoveredCallsCashSecuredPutsProfits({ trades }: CoveredCallsCashSecuredPutsProfitsProps) {
    /* Locals */
    const { allTimeTotal, monthlyTotals, tickerTotals, weeklyTotals } = new CC_CSP_CALCULATOR(trades).getAllTradeData()

    return (
        <Container maxWidth="xl">
            <Stack>
                {/* Weekly And Monthly Totals Container */}
                <Box
                    sx={{
                        columnGap: 6,
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" }, // Responsive layout
                        my: 2,
                        rowGap: 2,
                    }}
                >
                    {/* Weekly Totals */}
                    <Box minWidth={290} sx={{ overflow: "scroll" }}>
                        <Typography color="#8B8000" variant="h5">
                            Weekly Totals
                        </Typography>
                        {Object.entries(weeklyTotals).map((weekly) => {
                            const [week, weeklyTrade] = weekly
                            const { endDate, startDate, total, tradeCount } = weeklyTrade as WeeklyTradeData
                            const weekString = `${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`

                            return (
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    gap={3}
                                    justifyContent={{ md: "space-between", xs: "flex-start" }}
                                    key={week}
                                >
                                    <Typography variant="body1">
                                        Week: {week}{" "}
                                        <Box
                                            component="span"
                                            sx={{
                                                display: { sm: "inline", xs: "none" }, // Only show on small screens and up
                                            }}
                                        >
                                            {weekString}
                                        </Box>
                                    </Typography>
                                    <Typography color="success" variant="body1">
                                        ${Math.abs(total).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body1">{tradeCount} trades</Typography>
                                </Box>
                            )
                        })}
                    </Box>

                    {/* Monthly Totals */}
                    <Box>
                        <Typography color="#8B8000" variant="h5">
                            Monthly Totals
                        </Typography>
                        {Object.entries(monthlyTotals).map(([symbol, { total, tradeCount }]) => (
                            <Box display="flex" flexDirection="row" gap={2} key={symbol}>
                                <Typography variant="body1">{symbol} </Typography>
                                <Typography color="success" variant="body1">
                                    ${Math.abs(total).toFixed(2)}
                                </Typography>
                                <Typography variant="body1"> {tradeCount.toString().padStart(2)} Trades</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Ticker Totals */}
                <Box my={2}>
                    <Typography color="#8B8000" variant="h5">
                        Ticker Totals
                    </Typography>
                    {Object.entries(tickerTotals).map(([symbol, total]) => (
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            key={symbol}
                            sx={{ width: 200 }}
                        >
                            <Typography variant="body1">{symbol} Totals: </Typography>
                            <Typography color="success" variant="body1">
                                ${Math.abs(total).toFixed(2)}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* All Time Totals */}
                <Box display="flex" gap={2} my={2}>
                    <Typography color="#8B8000" variant="h5">
                        All Time Total:
                    </Typography>
                    <Typography color="success" variant="h5">
                        ${Math.abs(allTimeTotal).toFixed(2)}
                    </Typography>
                </Box>
            </Stack>
        </Container>
    )
}

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0")
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
}
