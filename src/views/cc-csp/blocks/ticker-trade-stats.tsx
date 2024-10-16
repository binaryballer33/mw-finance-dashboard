import type { TickerTradeData } from "src/types/trades/ticker-trade-data"

import { Box, Typography } from "@mui/material"

import convertToFloat from "src/utils/helper-functions/convertToFloat"

type TickerTotalsProps = {
    tickerTradeData: TickerTradeData[]
}

export default function TickerTradeStats(props: TickerTotalsProps) {
    const { tickerTradeData } = props

    return (
        <Box my={2}>
            <Typography color="#8B8000" variant="h5">
                Ticker Totals
            </Typography>
            {tickerTradeData.map((tickerItem) => {
                const { ticker, total, tradeCount } = tickerItem

                return (
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap={2}
                        justifyContent="space-between"
                        key={ticker}
                        sx={{ width: 250 }}
                    >
                        <Typography variant="body1">{ticker} Totals: </Typography>
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
