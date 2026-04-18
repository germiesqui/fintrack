import { ExpenseList } from "../components/ExpenseList"
import { useExpenses } from "../context/ExpenseContext"


export function ExpensesPage(){
    const { loading, error } = useExpenses()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return <ExpenseList />
}