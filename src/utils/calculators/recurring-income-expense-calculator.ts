import type { MonthlyRecurring, YearlyRecurring } from "@prisma/client"
import type {
    MonthlyExpensesData,
    MonthlyIncomesData,
    MonthlyRecurringData,
} from "src/types/trades/monthly-recurring-data"
import type { YearlyExpensesData, YearlyIncomesData, YearlyRecurringData } from "src/types/trades/yearly-recurring-data"

export default class RecurringIncomeExpenseCalculator {
    private monthlyRecurring: MonthlyRecurring[]

    private yearlyRecurring: YearlyRecurring[]

    constructor(monthlyRecurring: MonthlyRecurring[], yearlyRecurring: YearlyRecurring[]) {
        this.monthlyRecurring = monthlyRecurring
        this.yearlyRecurring = yearlyRecurring
    }

    private getMonthlyRecurringExpensesData(): MonthlyExpensesData {
        const expenses = this.monthlyRecurring.filter((item) => item.type === "EXPENSE")
        const expensesTotal = parseFloat(expenses.reduce((total, item) => total + item.amount, 0).toFixed(2))

        return { expenses, expensesTotal }
    }

    private getMonthlyRecurringIncomesData(): MonthlyIncomesData {
        const incomes = this.monthlyRecurring.filter((item) => item.type === "INCOME")
        const incomesTotal = parseFloat(incomes.reduce((total, item) => total + item.amount, 0).toFixed(2))

        return { incomes, incomesTotal }
    }

    private getYearlyRecurringExpenses(): YearlyExpensesData {
        const expenses = this.yearlyRecurring.filter((item) => item.type === "EXPENSE")
        const expensesTotal = parseFloat(expenses.reduce((total, item) => total + item.amount, 0).toFixed(2))

        return { expenses, expensesTotal }
    }

    private getYearlyRecurringIncomes(): YearlyIncomesData {
        const incomes = this.yearlyRecurring.filter((item) => item.type === "INCOME")
        const incomesTotal = parseFloat(incomes.reduce((total, item) => total + item.amount, 0).toFixed(2))

        return { incomes, incomesTotal }
    }

    public getMonthlyRecurringData(): Omit<MonthlyRecurringData, "avgProfitLoss"> {
        const { expenses, expensesTotal } = this.getMonthlyRecurringExpensesData()
        const { incomes, incomesTotal } = this.getMonthlyRecurringIncomesData()

        return { expenses, expensesTotal, incomes, incomesTotal }
    }

    public getYearlyRecurringData(): YearlyRecurringData {
        const { incomes, incomesTotal } = this.getYearlyRecurringIncomes()
        const { expenses, expensesTotal } = this.getYearlyRecurringExpenses()

        return { expenses, expensesTotal, incomes, incomesTotal }
    }
}
