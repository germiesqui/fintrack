import { Routes, Route } from "react-router-dom"
import { DashboardPage } from "./pages/DashboardPage"
import { ExpensesPage } from "./pages/ExpensesPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Navbar } from "./components/Navbar"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}