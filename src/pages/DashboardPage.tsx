import { useExpenseStats } from "../hooks/useExpenseStats"

export function DashboardPage(){
    const { total, count, byCategory } = useExpenseStats()
    return (
        <div>
            <p>Number of expenses: {count}</p>
            <p>Total Amount: ${total.toFixed(2)}</p>
            <h3>Expenses by Category</h3>
            {Object.entries(byCategory).map(([category, amount]) => (
                <p key={category}>{category}: ${amount.toFixed(2)}</p>
            ))}
        </div>
    )
}