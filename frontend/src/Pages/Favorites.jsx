import { useTravel } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';

export default function Favorites() {
    const { favorites, toggleFavorite } = useTravel();

    // Se non ci sono preferiti
    if (favorites.length === 0) {
        return (
            <div className="container py-5 min-height-page">
                <h2 className="text-center mb-4">I Tuoi Preferiti</h2>
                <div className="empty-state">
                    <i className="fas fa-heart fa-4x text-muted mb-4"></i>
                    <h4 className="text-muted">Nessun preferito salvato</h4>
                    <p className="text-muted mb-4">
                        Aggiungi viaggi ai preferiti per trovarli facilmente qui
                    </p>
                    <Link to="/" className="btn btn-primary">
                        <i className="fas fa-home me-2"></i>
                        Esplora Viaggi
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">I Tuoi Preferiti ({favorites.length})</h2>

            <div className="row">
                {favorites.map((travel) => (
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
                                <span className={`badge category-badge mb-2 align-self-start ${travel.category?.toLowerCase() === 'avventura' ? 'badge-avventura' :
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
                                <p className="card-text flex-grow-1">
                                    {travel.description?.length > 100
                                        ? `${travel.description.substring(0, 100)}...`
                                        : travel.description
                                    }
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <span className="h5 text-success mb-0">€{travel.price}</span>
                                    <div>
                                        <Link
                                            to={`/trips/${travel.id}`}
                                            className="btn btn-outline-primary btn-sm me-2"
                                        >
                                            Dettagli
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => toggleFavorite(travel)}
                                        >
                                            <i className="fas fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}