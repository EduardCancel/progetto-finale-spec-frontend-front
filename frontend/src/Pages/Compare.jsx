import { useTravel } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';

function Compare() {
    const { compareList, removeFromCompare, clearCompare } = useTravel();

    // Se non ci sono viaggi da confrontare
    if (compareList.length === 0) {
        return (
            <div className="container py-5">
                <h2 className="text-center mb-4">Confronta Viaggi</h2>
                <div className="text-center py-5">
                    <i className="fas fa-balance-scale fa-4x text-muted mb-4"></i>
                    <h4 className="text-muted">Nessun viaggio selezionato</h4>
                    <p className="text-muted mb-4">
                        Aggiungi fino a 4 viaggi per confrontarli
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
                <h2>Confronta Viaggi ({compareList.length}/4)</h2>
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
                    <div key={travel.id} className="col-xl-3 col-lg-6 col-md-6 mb-4">
                        <div className="card h-100 shadow">
                            {/* Header card con rimozione */}
                            <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                                <h6 className="mb-0">Viaggio {index + 1}</h6>
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
                                style={{ height: '150px', objectFit: 'cover' }}
                            />

                            {/* Contenuto */}
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title">{travel.title}</h6>

                                {/* Prezzo */}
                                <div className="mb-2">
                                    <span className="h6 text-success">€{travel.price}</span>
                                </div>

                                {/* Dettagli */}
                                <div className="compare-details flex-grow-1">
                                    <div className="detail-row mb-1">
                                        <strong>Categoria:</strong>
                                        <span className="badge bg-primary ms-2 small">{travel.category}</span>
                                    </div>

                                    {travel.brand && (
                                        <div className="detail-row mb-1">
                                            <strong>Brand:</strong>
                                            <span className="ms-2 small">{travel.brand}</span>
                                        </div>
                                    )}

                                    {travel.durationDays && (
                                        <div className="detail-row mb-2">
                                            <strong>Durata:</strong>
                                            <span className="ms-2 small">{travel.durationDays} giorni</span>
                                        </div>
                                    )}

                                    <div className="detail-row mb-2">
                                        <strong>Descrizione:</strong>
                                        <p className="mt-1 text-muted small">
                                            {travel.description?.length > 80
                                                ? `${travel.description.substring(0, 80)}...`
                                                : travel.description || 'Non disponibile'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Bottone dettagli */}
                                <div className="mt-auto">
                                    <Link
                                        to={`/trips/${travel.id}`}
                                        className="btn btn-outline-primary btn-sm w-100"
                                    >
                                        Dettagli
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Placeholder per viaggi mancanti */}
                {compareList.length < 4 && (
                    <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                        <div className="card h-100 border-dashed text-center d-flex align-items-center justify-content-center">
                            <div className="card-body">
                                <i className="fas fa-plus-circle fa-2x text-muted mb-2"></i>
                                <h6 className="text-muted">Aggiungi viaggio</h6>
                                <p className="text-muted small">Puoi confrontare fino a 4 viaggi</p>
                                <Link to="/" className="btn btn-primary btn-sm">
                                    Scegli
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Compare;