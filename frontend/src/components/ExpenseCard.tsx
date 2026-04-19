import type { Expense } from "../types"


export function ExpenseCard({ name, amount, category, date }: Expense) {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
        <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-400 mt-0.5">{category} · {date}</p>
        </div>
        <span className="text-green-600 font-semibold text-lg">${amount.toFixed(2)}</span>
    </div>
  )
}