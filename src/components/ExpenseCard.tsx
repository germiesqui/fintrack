import type { Expense } from "../types"


export function ExpenseCard({ name, amount, category, date }: Expense) {

  return (
    <div>
      <h2>{name}</h2>
      <p>Amount: ${amount.toFixed(2)}</p>
      <p>Category: {category}</p>
      <p>Date: {date}</p>
    </div>
  )
}