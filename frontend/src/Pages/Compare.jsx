import { useTravel } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';

function Compare() {
    const { compareList, removeFromCompare, clearCompare } = useTravel();

    // Se non ci sono viaggi da confrontare
    if (compareList.length === 0) {
        return (
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="section-title">Confronta Viaggi</h2>
                    <p className="text-muted">Seleziona fino a 4 viaggi per confrontarli</p>
                </div>
                <div className="text-center py-5">
                    <div className="empty-state">
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
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="section-title">Confronta Viaggi</h2>
                <p className="text-muted">Confronto di {compareList.length} su 4 viaggi massimi</p>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <button
                    className="btn btn-danger btn-clear-compare"
                    onClick={clearCompare}
                >
                    <i className="fas fa-trash me-2"></i>
                    Pulisci Confronto
                </button>
            </div>

            <div className="row">
                {compareList.map((travel, index) => (
                    <div key={travel.id} className="col-lg-3 col-md-6 mb-4">
                        <div className="card compare-card h-100">
                            {/* Header card con indice e rimozione */}
                            <div className="compare-header">
                                <div className="compare-number">#{index + 1}</div>
                                <button
                                    className="btn-remove"
                                    onClick={() => removeFromCompare(travel.id)}
                                    title="Rimuovi dal confronto"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            {/* Immagine SENZA categoria */}
                            <div className="card-img-wrapper">
                                <img
                                    src={travel.img || 'https://via.placeholder.com/400x200?text=Immagine+non+disponibile'}
                                    className="card-img-top"
                                    alt={travel.title}
                                />
                            </div>

                            {/* Contenuto */}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title compare-title">{travel.title}</h5>

                                {/* Categoria SOTTO il titolo */}
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

                                {/* Prezzo prominente */}
                                <div className="price-section mb-3">
                                    <span className="price-label">Da</span>
                                    <span className="price">€{travel.price}</span>
                                </div>

                                {/* Dettagli confronto */}
                                <div className="compare-details flex-grow-1">
                                    {travel.brand && (
                                        <div className="detail-item">
                                            <i className="fas fa-tag text-primary me-2"></i>
                                            <strong>Brand:</strong>
                                            <span className="ms-1">{travel.brand}</span>
                                        </div>
                                    )}

                                    {travel.durationDays && (
                                        <div className="detail-item">
                                            <i className="fas fa-calendar-alt text-primary me-2"></i>
                                            <strong>Durata:</strong>
                                            <span className="ms-1">{travel.durationDays} giorni</span>
                                        </div>
                                    )}

                                    <div className="detail-item">
                                        <i className="fas fa-info-circle text-primary me-2"></i>
                                        <strong>Descrizione:</strong>
                                        <p className="mt-1 text-muted small mb-0">
                                            {travel.description?.length > 80
                                                ? `${travel.description.substring(0, 80)}...`
                                                : travel.description || 'Non disponibile'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Bottone dettagli */}
                                <div className="mt-auto pt-3">
                                    <Link
                                        to={`/trips/${travel.id}`}
                                        className="btn btn-primary btn-details w-100"
                                    >
                                        <i className="fas fa-info-circle me-2"></i>
                                        Dettagli Completi
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Placeholder per viaggi mancanti */}
                {[...Array(4 - compareList.length)].map((_, index) => (
                    <div key={`placeholder-${index}`} className="col-lg-3 col-md-6 mb-4">
                        <div className="card border-dashed h-100 d-flex align-items-center justify-content-center">
                            <div className="text-center p-4">
                                <i className="fas fa-plus-circle fa-3x text-muted mb-3"></i>
                                <h6 className="text-muted mb-2">Slot Libero</h6>
                                <p className="text-muted small mb-3">
                                    Aggiungi un altro viaggio per confrontarlo
                                </p>
                                <Link to="/" className="btn btn-outline-primary btn-sm">
                                    <i className="fas fa-search me-1"></i>
                                    Scegli Viaggio
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Compare;