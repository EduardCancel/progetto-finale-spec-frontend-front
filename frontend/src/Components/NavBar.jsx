import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Agenzia Viaggi</Link>
            </div>
            <div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/comparatore">Comparatore</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/preferiti">Preferiti</Link>
                    </li>
                </ul>
            </div>

        </nav>
    )
}
