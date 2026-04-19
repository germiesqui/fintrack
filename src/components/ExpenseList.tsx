import { ExpenseCard } from "./ExpenseCard"
import { AddExpenseForm } from "./AddExpenseForm"
import { useExpenses } from "../context/ExpenseContext"



export function ExpenseList(){    
    const { expenses, deleteExpense } = useExpenses()

    return (
        <div className="flex flex-col gap-3">
            {expenses.map(expense => (
                <div key={expense.id} className="flex items-center gap-3">
                    <div className="flex-1">
                        <ExpenseCard {...expense} />
                    </div>
                    <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-sm text-red-400 hover:text-red-600 transition-colors font-medium px-2 py-1"
                    >
                        Delete
                    </button>
                </div>
            ))}
            <div className="mt-4">
                <AddExpenseForm />
            </div>
        </div>
    )
}