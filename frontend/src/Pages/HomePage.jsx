
import { useTravel } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';

function HomePage() {
    const {
        allTravels,
        loading,
    } = useTravel();

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
            {/* Sezione Hero */}
            <div className="hero-section">
                <div className="container text-center py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="hero-title display-4 fw-bold mb-3">
                                Esplora il Mondo con Wanderlust
                            </h1>
                            <p className="hero-subtitle lead mb-4 text-muted">
                                Scopri destinazioni incredibili e crea ricordi indimenticabili.
                                Il tuo prossimo viaggio ti aspetta.
                            </p>
                            <div className="hero-stats d-flex justify-content-center gap-4 flex-wrap mb-4">
                                <div className="stat-item">
                                    <i className="fas fa-map-marker-alt text-primary"></i>
                                    <span className="ms-2">{allTravels.length} Destinazioni</span>
                                </div>
                                <div className="stat-item">
                                    <i className="fas fa-users text-primary"></i>
                                    <span className="ms-2">1000+ Viaggiatori Felici</span>
                                </div>
                                <div className="stat-item">
                                    <i className="fas fa-star text-primary"></i>
                                    <span className="ms-2">4.8 Stelle di Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sezione Destinazioni */}
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="section-title h3 fw-semibold">Le Nostre Destinazioni</h2>
                    <p className="text-muted">Scegli la tua prossima avventura</p>
                </div>

                {allTravels.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="empty-state">
                            <i className="fas fa-search fa-4x text-muted mb-3"></i>
                            <h4 className="text-muted">Nessun viaggio trovato</h4>
                            <p className="text-muted">Prova a modificare i filtri di ricerca nella navbar</p>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {allTravels.map((travel) => (
                            <div key={travel.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="card travel-card h-100 border-0">
                                    <div className="card-img-wrapper">
                                        <img
                                            src={travel.img || 'https://via.placeholder.com/400x200?text=Immagine+non+disponibile'}
                                            className="card-img-top"
                                            alt={travel.title}
                                        />
                                        <div className="card-overlay">
                                            <span className={`badge category-badge ${travel.category?.toLowerCase() === 'avventura' ? 'badge-avventura' :
                                                travel.category?.toLowerCase() === 'relax' ? 'badge-relax' :
                                                    travel.category?.toLowerCase() === 'cultura' ? 'badge-cultura' :
                                                        travel.category?.toLowerCase() === 'natura' ? 'badge-natura' :
                                                            travel.category?.toLowerCase() === 'mare' ? 'badge-mare' :
                                                                travel.category?.toLowerCase() === 'montagna' ? 'badge-montagna' :
                                                                    travel.category?.toLowerCase() === 'città' ? 'badge-citta' :
                                                                        'badge-default'
                                                }`}>
                                                {travel.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body d-flex flex-column p-4">
                                        <h5 className="card-title fw-bold mb-3">{travel.title}</h5>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <div className="price-section">
                                                <span className="price-label text-muted small">Da</span>
                                                <span className="price h5 text-success fw-bold ms-1">€{travel.price}</span>
                                            </div>
                                            <Link to={`/trips/${travel.id}`} className="btn btn-primary btn-explore">
                                                <i className="fas fa-arrow-right me-1"></i>
                                                Esplora
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
