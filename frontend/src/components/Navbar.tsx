import { Link } from "react-router-dom";

export function Navbar(){
    return(
        <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
            <span className="text-xl font-bold tracking-tight">FinTrack</span>
            <div className="flex gap-6">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Dashboard</Link>
                <Link to="/expenses" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Expenses</Link>
            </div>
        </nav>
    )
}