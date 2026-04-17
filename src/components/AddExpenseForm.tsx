import { useState } from "react"
import type { ChangeEvent, SubmitEvent } from "react"
import type { Expense } from "../types"

interface AddExpenseFormProps {
  onAdd: (expense: Omit<Expense, "id">) => void
}

export function AddExpenseForm({ onAdd }: AddExpenseFormProps){
    const [form, setForm] = useState<Omit<Expense, 'id'>>({ name: '', amount:  0, category: "", date: ""})

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.name === "amount" ? Number(e.target.value) : e.target.value
        setForm({ ...form, [e.target.name]: value })
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        onAdd(form)
        setForm({ name: '', amount:  0, category: "", date: ""})
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
            <input type="number" name="amount" value={form.amount} onChange={handleChange} />
            <input type="text" name="category" value={form.category} onChange={handleChange} />
            <input type="date" name="date" value={form.date} onChange={handleChange} />
            <button type="submit">Add Expense</button>
        </form>
    )
}