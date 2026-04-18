import { ExpenseCard } from "./ExpenseCard"
import { AddExpenseForm } from "./AddExpenseForm"
import { useExpenses } from "../context/ExpenseContext"



export function ExpenseList(){    
    const { expenses, deleteExpense } = useExpenses()

    return (
        <div>
            {expenses.map(expense => (
                <div key={expense.id}>
                    <ExpenseCard {...expense} />
                    <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                </div>
            ))}
            <AddExpenseForm />
        </div>
    )
}