import { useState } from "react"
import type { ChangeEvent, SubmitEvent } from "react"
import type { Expense } from "../types"
import { useExpenses } from "../context/ExpenseContext"


export function AddExpenseForm(){
    const [form, setForm] = useState<Omit<Expense, 'id'>>({ name: '', amount:  0, category: "", date: ""})
    const { addExpense } = useExpenses()

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.name === "amount" ? Number(e.target.value) : e.target.value
        setForm({ ...form, [e.target.name]: value })
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        addExpense(form)
        setForm({ name: '', amount:  0, category: "", date: ""})
    }


    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="font-semibold text-gray-700 mb-3">Add expense</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Name"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                    type="number" name="amount" value={form.amount} onChange={handleChange}
                    placeholder="Amount"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                    type="text" name="category" value={form.category} onChange={handleChange}
                    placeholder="Category"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                    type="date" name="date" value={form.date} onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>
            <button
                type="submit"
                className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-colors text-sm"
            >
                Add expense
            </button>
        </form>
    )
}