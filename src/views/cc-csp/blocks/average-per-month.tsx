import { Box, Typography } from "@mui/material"

type AveragePerMonthProps = {
    avgMonthlyProfitLoss: number
}

export default function AveragePerMonth(props: AveragePerMonthProps) {
    const { avgMonthlyProfitLoss } = props

    return (
        <Box display="flex" gap={2} my={2}>
            <Typography color="#8B8000" variant="h5">
                Avg Profits / Month:
            </Typography>
            <Typography color="success" variant="h5">
                ${avgMonthlyProfitLoss.toFixed(2)}
            </Typography>
        </Box>
    )
}
