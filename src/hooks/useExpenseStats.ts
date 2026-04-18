import { useMemo } from "react"
import { useExpenses } from "../context/ExpenseContext"

export function useExpenseStats() {
    const { expenses } = useExpenses()

    const total = useMemo(
        () => expenses.reduce((sum, e) => sum + e.amount, 0),
        [expenses]
    )
    const count = expenses.length

    const byCategory = useMemo(
        () => expenses.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] ?? 0) + e.amount
            return acc
        }, {} as Record<string, number>),
        [expenses]
    )

    return { total, count, byCategory }
}