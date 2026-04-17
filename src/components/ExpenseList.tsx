import { useEffect, useState } from "react"
import { ExpenseCard } from "./ExpenseCard"
import type { Expense } from "../types"
import { AddExpenseForm } from "./AddExpenseForm"

interface TodoResponse {
  id: number
  title: string
  completed: boolean
}

export function ExpenseList(){
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, name: 'Coffee', amount: 3.5 , category: "Food", date: "07-09-2026"}, 
        { id: 2, name: 'Netflix', amount: 10 , category: "Subscription", date: "02-09-2026"}, 
        { id: 3, name: 'Chocolate', amount: 1.5 , category: "Food", date: "01-09-2026"}
    ])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    function handleDelete(id: number) {
        setExpenses(expenses.filter(e => e.id !== id))
    }

    function handleAdd(expense: Omit<Expense, "id">) {
        const newExpense = { ...expense, id: Date.now() }
        setExpenses([...expenses, newExpense])
    }

    useEffect(() => {
        async function fetchExpenses() {
            try{
                const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
                if (!res.ok) throw new Error(res.statusText);

                const data = await res.json() as TodoResponse[]
                const parsedData: Expense[] = data.map((elem) => {
                    return {id: elem.id, name: elem.title, amount: 1, category: "Uncategorised", date: new Date().toISOString().split("T")[0]}
                })

                setExpenses(parsedData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)  // runs whether fetch succeeded or failed
            }
        }

        fetchExpenses()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

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