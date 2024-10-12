import type { TradeData } from "src/types/trades/trade-data"

import { Container } from "@mui/material"

import FlexContainer from "src/components/flex-box/flex-container"

import AllTimeTotal from "src/views/cc-csp/blocks/all-time-total"
import AveragePerMonth from "src/views/cc-csp/blocks/average-per-month"
import MonthlyTradeStats from "src/views/cc-csp/blocks/monthly-trade-stats"
import TickerTradeStats from "src/views/cc-csp/blocks/ticker-trade-stats"
import WeeklyTradeStats from "src/views/cc-csp/blocks/weekly-trade-stats"

type CoveredCallsCashSecuredPutsProfitsProps = {
    tradeData: TradeData
}

export default async function CoveredCallsCashSecuredPutsProfits(props: CoveredCallsCashSecuredPutsProfitsProps) {
    const {
        tradeData: { allTimeTotal, avgMonthlyProfitLoss, monthlyTradeData, tickerTradeData, weeklyTradeData },
    } = props

    return (
        <Container maxWidth="xl">
            <FlexContainer columnGap={6} my={2} rowGap={2} stackOn="mobile">
                <WeeklyTradeStats weeklyTradeData={weeklyTradeData} />
                <MonthlyTradeStats monthlyTradeData={monthlyTradeData} />
            </FlexContainer>

            <TickerTradeStats tickerTradeData={tickerTradeData} />

            <FlexContainer columnGap={6} my={2} rowGap={2} stackOn="mobile">
                <AllTimeTotal allTimeTotal={allTimeTotal} />
                <AveragePerMonth avgMonthlyProfitLoss={avgMonthlyProfitLoss} />
            </FlexContainer>
        </Container>
    )
}
