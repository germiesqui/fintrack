import { useExpenseStats } from "../hooks/useExpenseStats"

export function DashboardPage(){
    const { total, count, byCategory } = useExpenseStats()
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <p className="text-sm text-gray-400 mb-1">Total spent</p>
                    <p className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <p className="text-sm text-gray-400 mb-1">Expenses</p>
                    <p className="text-3xl font-bold text-gray-900">{count}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <p className="font-semibold text-gray-700 mb-4">By category</p>
                <div className="flex flex-col gap-3">
                    {Object.entries(byCategory).map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{category}</span>
                            <span className="text-sm font-semibold text-gray-900">${amount.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}