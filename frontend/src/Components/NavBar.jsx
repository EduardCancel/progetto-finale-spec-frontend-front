import { Link } from 'react-router-dom';
import { useTravel } from '../GlobalContext/GlobalContext';

function Navbar() {
    const {
        favorites,
        compareList
    } = useTravel();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="fas fa-plane me-2"></i>
                    Wanderlust
                </Link>

                {/* Toggle per mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Menu principale - Centro */}
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="fas fa-home me-1"></i>
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/compare">
                                <i className="fas fa-balance-scale me-1"></i>
                                Confronta
                                {compareList.length > 0 && (
                                    <span className="position-absolute start-100 translate-middle badge rounded-pill bg-warning text-dark">
                                        {compareList.length}
                                    </span>
                                )}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/favorites">
                                <i className="fas fa-heart me-1"></i>
                                Preferiti
                                {favorites.length > 0 && (
                                    <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger">
                                        {favorites.length}
                                    </span>
                                )}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/search">
                                <i className="fas fa-search me-1"></i>
                                Cerca Viaggi
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
