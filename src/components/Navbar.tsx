import { Link } from "react-router-dom";

export function Navbar(){
    return(
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/expenses">Expenses</Link>
        </nav>
    )
}