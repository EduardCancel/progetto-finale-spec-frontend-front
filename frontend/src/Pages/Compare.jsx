import { useTravel } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';

export default function Compare() {
    const { compareList, removeFromCompare, clearCompare, allTravels } = useTravel();

    // Se non ci sono viaggi da confrontare
    if (compareList.length === 0) {
        return (
            <div className="container py-5">
                <h2 className="text-center mb-4">Confronta Viaggi</h2>
                <div className="text-center py-5">
                    <i className="fas fa-balance-scale fa-4x text-muted mb-4"></i>
                    <h4 className="text-muted">Nessun viaggio selezionato</h4>
                    <p className="text-muted mb-4">
                        Aggiungi fino a 2 viaggi per confrontarli
                    </p>
                    <Link to="/" className="btn btn-primary">
                        <i className="fas fa-home me-2"></i>
                        Torna alla Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Confronta Viaggi ({compareList.length}/2)</h2>
                <button
                    className="btn btn-outline-danger"
                    onClick={clearCompare}
                >
                    <i className="fas fa-trash me-2"></i>
                    Pulisci Confronto
                </button>
            </div>

            <div className="row">
                {compareList.map((travel, index) => (
                    <div key={travel.id} className="col-md-6 mb-4">
                        <div className="card h-100 shadow">
                            {/* Header card con rimozione */}
                            <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                                <h5 className="mb-0">Viaggio {index + 1}</h5>
                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={() => removeFromCompare(travel.id)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            {/* Immagine */}
                            <img
                                src={travel.img || 'https://via.placeholder.com/400x200?text=Immagine+non+disponibile'}
                                className="card-img-top"
                                alt={travel.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />

                            {/* Contenuto */}
                            <div className="card-body">
                                <h5 className="card-title">{travel.title}</h5>

                                {/* Prezzo */}
                                <div className="mb-3">
                                    <span className="h4 text-success">€{travel.price}</span>
                                </div>

                                {/* Dettagli */}
                                <div className="compare-details">
                                    <div className="detail-row mb-2">
                                        <strong>Categoria:</strong>
                                        <span className="badge bg-primary ms-2">{travel.category}</span>
                                    </div>

                                    {travel.brand && (
                                        <div className="detail-row mb-2">
                                            <strong>Brand:</strong>
                                            <span className="ms-2">{travel.brand}</span>
                                        </div>
                                    )}

                                    {travel.durationDays && (
                                        <div className="detail-row mb-2">
                                            <strong>Durata:</strong>
                                            <span className="ms-2">{travel.durationDays} giorni</span>
                                        </div>
                                    )}

                                    <div className="detail-row mb-3">
                                        <strong>Descrizione:</strong>
                                        <p className="mt-2 text-muted small">
                                            {travel.description?.length > 150
                                                ? `${travel.description.substring(0, 150)}...`
                                                : travel.description || 'Descrizione non disponibile'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Bottone dettagli */}
                                <div className="mt-auto">
                                    <Link
                                        to={`/trips/${travel.id}`}
                                        className="btn btn-outline-primary w-100"
                                    >
                                        Vedi Dettagli Completi
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Placeholder per secondo viaggio se manca */}
                {compareList.length === 1 && (
                    <div className="col-md-6 mb-4">
                        <div className="card h-100 border-dashed text-center d-flex align-items-center justify-content-center">
                            <div className="card-body">
                                <i className="fas fa-plus-circle fa-3x text-muted mb-3"></i>
                                <h5 className="text-muted">Aggiungi un secondo viaggio</h5>
                                <p className="text-muted">Seleziona un altro viaggio dalla homepage o dai dettagli</p>
                                <Link to="/" className="btn btn-primary">
                                    Scegli Viaggio
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}