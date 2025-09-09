import { useTravel } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';

function SearchPage() {
    const {
        searchFilteredTravels,
        categoryFilteredTravels,
        sortedTravels,
        allTravels,
        loading,
        categories,
        searchText,
        setSearchText,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy
    } = useTravel();

    // Logica filtri SEPARATI - uno per volta
    const filteredResults = (() => {
        // Se c'è una ricerca attiva, mostra i risultati della ricerca
        if (searchText) {
            return searchFilteredTravels;
        }

        // Se c'è una categoria selezionata, mostra i risultati per categoria
        if (selectedCategory) {
            return categoryFilteredTravels;
        }

        // Se c'è un ordinamento selezionato, mostra i risultati ordinati
        if (sortBy) {
            return sortedTravels;
        }

        // Altrimenti mostra tutti i viaggi
        return allTravels;
    })();

    if (loading) {
        return (
            <div className="homepage-bg">
                <div className="container pt-5">
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Caricamento...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="homepage-bg">
            {/* Sezione Hero con Controlli */}
            <div className="hero-section">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="text-center mb-4">
                                <h1 className="hero-title display-4 fw-bold mb-3">
                                    🔍 Cerca il tuo viaggio perfetto
                                </h1>
                                <p className="hero-subtitle lead mb-4 text-muted">
                                    Utilizza i filtri per trovare la destinazione dei tuoi sogni
                                </p>
                            </div>

                            {/* Controlli di ricerca nella Hero */}
                            <div className="card border-0 shadow-lg bg-transparent">
                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        {/* Barra di Ricerca */}
                                        <div className="col-lg-4">
                                            <label className="form-label fw-semibold text-white">
                                                🏖️ Cerca destinazione
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Es: Roma, Parigi, Tokyo..."
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                        </div>

                                        {/* Filtro Categoria */}
                                        <div className="col-lg-4">
                                            <label className="form-label fw-semibold text-white">
                                                🏷️ Categoria
                                            </label>
                                            <select
                                                className="form-select form-select-lg"
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
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
                                        <div className="col-lg-4">
                                            <label className="form-label fw-semibold text-white">
                                                📊 Ordina per
                                            </label>
                                            <select
                                                className="form-select form-select-lg"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                            >
                                                <option value="">Ordine predefinito</option>
                                                <option value="title-asc">Nome A-Z</option>
                                                <option value="title-desc">Nome Z-A</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Reset Filtri */}
                                    {(searchText || selectedCategory || sortBy) && (
                                        <div className="text-center mt-3">
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => {
                                                    setSearchText('');
                                                    setSelectedCategory('');
                                                    setSortBy('');
                                                }}
                                            >
                                                🗑️ Cancella tutti i filtri
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Container Risultati */}
            <div className="container py-4">
                {/* Griglia Risultati */}
                <div className="row">
                    {filteredResults.length === 0 ? (
                        <div className="col-12">
                            <div className="text-center py-5">
                                <div className="mb-4">
                                    <i className="fas fa-search fa-4x text-muted"></i>
                                </div>
                                <h4 className="text-muted">Nessun viaggio trovato</h4>
                                <p className="text-muted mb-4">
                                    Prova a modificare i filtri di ricerca o
                                    <button
                                        className="btn btn-link p-0 ms-1"
                                        onClick={() => {
                                            setSearchText('');
                                            setSelectedCategory('');
                                            setSortBy('');
                                        }}
                                    >
                                        cancella tutti i filtri
                                    </button>
                                </p>
                                <Link to="/" className="btn btn-primary">
                                    🏠 Torna alla Homepage
                                </Link>
                            </div>
                        </div>
                    ) : (
                        filteredResults.map((travel) => (
                            <div key={travel.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="card travel-card h-100 border-0 shadow-sm">
                                    <div className="position-relative">
                                        <img
                                            src={travel.img || 'https://via.placeholder.com/400x250?text=Immagine+non+disponibile'}
                                            className="card-img-top"
                                            alt={travel.title}
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                        <div className="position-absolute top-0 end-0 p-2">
                                            <span className={`badge ${travel.category?.toLowerCase() === 'avventura' ? 'bg-danger' :
                                                travel.category?.toLowerCase() === 'relax' ? 'bg-success' :
                                                    travel.category?.toLowerCase() === 'cultura' ? 'bg-warning' :
                                                        travel.category?.toLowerCase() === 'natura' ? 'bg-info' :
                                                            travel.category?.toLowerCase() === 'mare' ? 'bg-primary' :
                                                                travel.category?.toLowerCase() === 'montagna' ? 'bg-secondary' :
                                                                    travel.category?.toLowerCase() === 'città' ? 'bg-dark' :
                                                                        'bg-light'
                                                }`}>
                                                {travel.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-bold mb-2">{travel.title}</h5>
                                        <p className="card-text text-muted flex-grow-1">
                                            {travel.description?.substring(0, 100)}...
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="price-section">
                                                <span className="text-muted small">Da</span>
                                                <span className="h5 text-success fw-bold ms-1">€{travel.price}</span>
                                            </div>
                                            <Link
                                                to={`/trips/${travel.id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                <i className="fas fa-arrow-right me-1"></i>
                                                Dettagli
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
