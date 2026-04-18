import { createContext, useContext, useEffect, useState } from "react"
import type { Expense } from "../types"

interface ExpenseContextType {
  expenses: Expense[]
  loading: boolean
  error: string | null
  addExpense: (expense: Omit<Expense, "id">) => void
  deleteExpense: (id: number) => void
}

interface TodoResponse {
  id: number
  title: string
  completed: boolean
}

export const ExpenseContext = createContext<ExpenseContextType | null>(null)

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, name: 'Coffee', amount: 3.5 , category: "Food", date: "07-09-2026"}, 
        { id: 2, name: 'Netflix', amount: 10 , category: "Subscription", date: "02-09-2026"}, 
        { id: 3, name: 'Chocolate', amount: 1.5 , category: "Food", date: "01-09-2026"}
    ])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
                setLoading(false)
            }
        }

        fetchExpenses()
    }, [])

    function addExpense(expense: Omit<Expense, "id">) {
        setExpenses(prev => [...prev, { ...expense, id: Date.now() }])
    }

    function deleteExpense(id: number) {
        setExpenses(prev => prev.filter(e => e.id !== id))
    }

    return (
        <ExpenseContext.Provider value={{ expenses, loading, error, addExpense, deleteExpense }}>
        {children}
        </ExpenseContext.Provider>
    )
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext)
  if (!ctx) throw new Error("useExpenses must be used inside ExpenseProvider")
  return ctx
}