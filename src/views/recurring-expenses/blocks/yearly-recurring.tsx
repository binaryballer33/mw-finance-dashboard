import type { StackOwnProps } from "@mui/material"
import type { YearlyRecurring as YearlyRecurringFinance } from "@prisma/client"

import dayjs from "dayjs"

import { Box, Stack, Tooltip, Typography } from "@mui/material"

type YearlyExpensesProps = {
    today: dayjs.Dayjs
    type: "EXPENSE" | "INCOME"
    yearlyRecurring: YearlyRecurringFinance[]
} & StackOwnProps

export default function YearlyRecurring(props: YearlyExpensesProps) {
    const { today, type, yearlyRecurring, ...restOfStackProps } = props

    const yearlyTotal = yearlyRecurring.reduce((total, expense) => total + expense.amount, 0).toFixed(2)

    return (
        <Stack gap={1} {...restOfStackProps}>
            <Box display={{ md: "flex", xs: "row" }} gap={2}>
                <Typography color="darkcyan" variant="h6">
                    {`Yearly Recurring ${type === "INCOME" ? "Incomes" : "Expenses"}: ${yearlyRecurring.length}`}
                </Typography>
                <Typography color="darkcyan" variant="h6">
                    {`Total: $${yearlyTotal}`}
                </Typography>
            </Box>
            <Stack gap={1}>
                {yearlyRecurring.map((yearlyExpense) => {
                    const { amount, category, id, monthDayDue, name } = yearlyExpense

                    const dueDate = dayjs(`${today.format("YYYY")}-${monthDayDue}`)
                    const futureDueDate = today.isAfter(dueDate) ? dueDate.add(1, "year") : dueDate
                    const daysUntilDue = futureDueDate.diff(today, "day")

                    // outlines the name of the expense depending on how many days until the bill is due
                    let borderColor = "inherit"
                    if (daysUntilDue <= 90) borderColor = "yellow"
                    if (daysUntilDue <= 30) borderColor = "red"

                    return (
                        <Box display={{ sm: "flex", xs: "column" }} gap={2} key={id}>
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
                            <Tooltip enterDelay={1000} enterNextDelay={1000} title={`Due In ${daysUntilDue} Days`}>
                                <Box display="flex" gap={2}>
                                    <Typography variant="body2">{category.toLowerCase()}</Typography>
                                    <Typography color={type === "INCOME" ? "success" : "error"} variant="body2">
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
        </Stack>
    )
}
