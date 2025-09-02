import { useTravel } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';

function HomePage() {
    const { filteredTravels, loading } = useTravel();

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">I Nostri Viaggi</h1>

            {/* Lista viaggi */}
            {filteredTravels.length === 0 ? (
                <div className="text-center py-5">
                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 className="text-muted">Nessun viaggio trovato</h4>
                    <p className="text-muted">Prova a modificare i filtri di ricerca nella navbar</p>
                </div>
            ) : (
                <div className="row">
                    {filteredTravels.map((travel) => (
                        <div key={travel.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={travel.img || 'https://via.placeholder.com/400x200?text=Immagine+non+disponibile'}
                                    className="card-img-top"
                                    alt={travel.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{travel.title}</h5>
                                    <span className="badge bg-primary mb-2 align-self-start">
                                        {travel.category}
                                    </span>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <span className="h5 text-success mb-0">€{travel.price}</span>
                                        <Link to={`/trips/${travel.id}`} className="btn btn-outline-primary">
                                            Vedi Dettagli
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;