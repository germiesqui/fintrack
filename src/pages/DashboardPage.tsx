import { useExpenses } from "../context/ExpenseContext"

export function DashboardPage(){
    const { expenses } = useExpenses()
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    return (
        <div>
            <p>Number of expenses: {expenses.length}</p>
            <p>Total Amount: ${total.toFixed(2)}</p>
        </div>
    )
}