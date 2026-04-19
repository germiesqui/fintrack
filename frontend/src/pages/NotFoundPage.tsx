import { Link } from "react-router-dom"

export function NotFoundPage(){
    return (
        <div className="flex flex-col items-center justify-center h-96 gap-4">
            <p className="text-6xl font-bold text-gray-200">404</p>
            <p className="text-gray-500 text-sm">Page not found</p>
            <Link to="/" className="text-green-500 hover:text-green-600 text-sm font-medium transition-colors">
                Go home
            </Link>
        </div>
    )
}