import { Link } from 'react-router-dom';
import { useTravel } from '../GlobalContext/GlobalContext';

function Navbar() {
    const {
        searchText,
        setSearchText,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        allTravels,
        favorites,
        compareList
    } = useTravel();

    // Ottieni le categorie uniche per il filtro
    const categories = [...new Set(allTravels.map(travel => travel.category))];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="fas fa-plane me-2"></i>
                    TravelApp
                </Link>

                {/* Toggle button per mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Ricerca e Filtri - Centro */}
                    <div className="navbar-nav mx-auto d-flex flex-row align-items-center gap-3">
                        {/* Barra di ricerca */}
                        <div className="nav-item">
                            <div className="input-group" style={{ minWidth: '200px' }}>
                                <span className="input-group-text bg-white border-0">
                                    <i className="fas fa-search text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-0"
                                    placeholder="Cerca viaggi..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    style={{ fontSize: '0.9rem' }}
                                />
                            </div>
                        </div>

                        {/* Filtro categoria */}
                        <div className="nav-item">
                            <select
                                className="form-select form-select-sm bg-white border-0"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{ minWidth: '150px', fontSize: '0.9rem' }}
                            >
                                <option value="">Tutte le categorie</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Ordinamento */}
                        <div className="nav-item">
                            <select
                                className="form-select form-select-sm bg-white border-0"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ minWidth: '130px', fontSize: '0.9rem' }}
                            >
                                <option value="">Ordina per</option>
                                <option value="title-asc">Titolo A-Z</option>
                                <option value="title-desc">Titolo Z-A</option>
                                <option value="category-asc">Categoria A-Z</option>
                                <option value="category-desc">Categoria Z-A</option>
                            </select>
                        </div>
                    </div>

                    {/* Menu di navigazione - Destra */}
                    <ul className="navbar-nav ms-auto">
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
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
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
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {favorites.length}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
