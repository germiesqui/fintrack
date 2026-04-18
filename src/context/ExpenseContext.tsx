import { createContext, useContext, useEffect, useReducer, useState } from "react"
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

type ExpenseAction =
  | { type: "ADD_EXPENSE";    payload: Omit<Expense, "id"> }
  | { type: "DELETE_EXPENSE"; payload: number }
  | { type: "SET_EXPENSES";   payload: Expense[] }

export const ExpenseContext = createContext<ExpenseContextType | null>(null)


function expenseReducer(state: Expense[], action: ExpenseAction): Expense[]{
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, { ...action.payload, id: Date.now() }]
        case "DELETE_EXPENSE":
            return state.filter(e => e.id !== action.payload)
        case "SET_EXPENSES":
            return action.payload
        default:
            return state
    }
}

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
    const [expenses, dispatch] = useReducer(expenseReducer, [])
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

                dispatch({ type: "SET_EXPENSES", payload: parsedData })
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)
            }
        }

        fetchExpenses()
    }, [])

    function addExpense(expense: Omit<Expense, "id">) {
        dispatch({ type: "ADD_EXPENSE", payload: expense })
    }

    function deleteExpense(id: number) {
        dispatch({ type: "DELETE_EXPENSE", payload: id })
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