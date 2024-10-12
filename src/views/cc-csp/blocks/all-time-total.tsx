import { Box, Typography } from "@mui/material"

type AllTimeTotalsProps = {
    allTimeTotal: number
}

function AllTimeTotal(props: AllTimeTotalsProps) {
    const { allTimeTotal } = props

    return (
        <Box display="flex" gap={2} my={2}>
            <Typography color="#8B8000" variant="h5">
                All Time Total:
            </Typography>
            <Typography color="success" variant="h5">
                ${Math.abs(allTimeTotal).toFixed(2)}
            </Typography>
        </Box>
    )
}

export default AllTimeTotal
