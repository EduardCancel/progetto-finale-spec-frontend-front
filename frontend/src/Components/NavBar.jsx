import { Link } from 'react-router-dom';
import { useState } from 'react';
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

    const [showFilters, setShowFilters] = useState(false);

    // Modo per ottenere le categorie senza doppioni 
    const categories = [];
    allTravels.forEach(travel => {
        if (!categories.includes(travel.category)) {
            categories.push(travel.category);
        }
    });

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

                    {/* Bottone Filtri - Destra */}
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-light dropdown-toggle"
                            onClick={() => setShowFilters(!showFilters)}
                            data-bs-toggle="dropdown"
                        >
                            <i className="fas fa-filter me-1"></i>
                            Filtri
                        </button>

                        <div className={`dropdown-menu dropdown-menu-end p-3 ${showFilters ? 'show' : ''}`}>
                            {/* Ricerca */}
                            <div className="mb-3">
                                <label className="form-label">Cerca:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cerca viaggi..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>

                            {/* Categoria */}
                            <div className="mb-3">
                                <label className="form-label">Categoria:</label>
                                <select
                                    className="form-select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Tutte</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Ordinamento */}
                            <div className="mb-3">
                                <label className="form-label">Ordina:</label>
                                <select
                                    className="form-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="">Default</option>
                                    <option value="title-asc">Titolo A-Z</option>
                                    <option value="title-desc">Titolo Z-A</option>
                                    <option value="category-asc">Categoria A-Z</option>
                                    <option value="category-desc">Categoria Z-A</option>
                                </select>
                            </div>

                            {/* Reset */}
                            <button
                                className="btn btn-sm btn-outline-secondary w-100"
                                onClick={() => {
                                    setSearchText('');
                                    setSelectedCategory('');
                                    setSortBy('');
                                }}
                            >
                                Reset Filtri
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
