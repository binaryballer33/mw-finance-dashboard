import type { StackOwnProps } from "@mui/material"
import type { MonthlyRecurring as MonthlyRecurringItem } from "@prisma/client"

import dayjs from "dayjs"

import { Box, Stack, Tooltip, Typography } from "@mui/material"

type MonthlyExpensesProps = {
    monthlyRecurring: MonthlyRecurringItem[]
    today: dayjs.Dayjs
    type: "EXPENSE" | "INCOME"
} & StackOwnProps

export default async function MonthlyRecurring(props: MonthlyExpensesProps) {
    const { monthlyRecurring, today, type, ...restOfStackProps } = props

    const monthlyTotal = monthlyRecurring.reduce((total, expense) => total + expense.amount, 0).toFixed(2)

    //  tooltips and typographies
    const accountChangeInDays = type === "INCOME" ? "Receiving In" : "Due In"
    const accountChangeColor = type === "INCOME" ? "success" : "error"
    const accountChangeType = type === "INCOME" ? "Incomes" : "Expenses"

    return (
        <Stack gap={1} {...restOfStackProps}>
            {/* Header */}
            <Box display={{ sm: "flex", xs: "row" }} gap={2}>
                <Typography color="darkcyan" variant="h6">
                    {`Monthly Recurring ${accountChangeType}: ${monthlyRecurring.length}`}
                </Typography>
                <Typography color="darkcyan" variant="h6">
                    {`Total: $${monthlyTotal}`}
                </Typography>
            </Box>

            {/* Monthly Recurring Expenses And Incomes */}
            {monthlyRecurring.map((monthlyExpense) => {
                const { amount, category, dueDayOfMonth, name } = monthlyExpense

                const dueDate = dayjs(`${today.format("YYYY-MM")}-${dueDayOfMonth}`)
                const futureDueDate = today.isAfter(dueDate) ? dueDate.add(1, "month") : dueDate
                const daysUntilDue = futureDueDate.diff(today, "day")

                // outlines the name of the expense depending on how many days until the bill is due
                let borderColor = "inherit"
                if (daysUntilDue <= 14) borderColor = "yellow"
                if (daysUntilDue <= 7) borderColor = "red"

                return (
                    <Box display={{ sm: "flex", xs: "column" }} gap={2} key={`${name}-${amount}`}>
                        <Tooltip enterDelay={1000} enterNextDelay={1000} title={name}>
                            <Typography
                                bgcolor="darkslategray"
                                noWrap
                                p={0.5}
                                sx={{ border: `1px solid ${borderColor}`, borderRadius: 2 }}
                                variant="body2"
                            >
                                {name}
                            </Typography>
                        </Tooltip>
                        <Tooltip
                            enterDelay={750}
                            enterNextDelay={750}
                            title={`${accountChangeInDays} ${daysUntilDue} Days`}
                        >
                            <Box display="flex" gap={2}>
                                <Typography variant="body2">{category.toLowerCase()}</Typography>
                                <Typography color={accountChangeColor} variant="body2">
                                    ${amount}
                                </Typography>
                                <Typography color="info" variant="body2">
                                    {futureDueDate.format("ddd MMM DD YYYY")}
                                </Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                )
            })}
        </Stack>
    )
}
