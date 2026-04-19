import { ExpenseList } from "../components/ExpenseList"
import { useExpenses } from "../context/ExpenseContext"


export function ExpensesPage(){
    const { loading, error } = useExpenses()

    if (loading) return (
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
            Loading...
        </div>
    )

    if (error) return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
                Error: {error}
            </div>
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Expenses</h1>
            <ExpenseList />
        </div>
    )
}