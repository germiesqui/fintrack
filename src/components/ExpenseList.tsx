import { useState } from "react"
import { ExpenseCard } from "./ExpenseCard"
import type { Expense } from "../types"
import { AddExpenseForm } from "./AddExpenseForm"

export function ExpenseList(){
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, name: 'Coffee', amount: 3.5 , category: "Food", date: "07-09-2026"}, 
        { id: 2, name: 'Netflix', amount: 10 , category: "Subscription", date: "02-09-2026"}, 
        { id: 3, name: 'Chocolate', amount: 1.5 , category: "Food", date: "01-09-2026"}
    ])

    function handleDelete(id: number) {
        setExpenses(expenses.filter(e => e.id !== id))
    }

    function handleAdd(expense: Omit<Expense, "id">) {
        const newExpense = { ...expense, id: Date.now() }
        setExpenses([...expenses, newExpense])
    }

    return (
        <div>
            {expenses.map(expense => (
                <div key={expense.id}>
                    <ExpenseCard {...expense} />
                    <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </div>
            ))}
            <AddExpenseForm onAdd={handleAdd} />
        </div>
    )
}