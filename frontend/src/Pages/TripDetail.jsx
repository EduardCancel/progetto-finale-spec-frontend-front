import { useParams } from "react-router-dom";
import { useTravel } from "../GlobalContext/GlobalContext";

export default function TripDetail() {
    const { id } = useParams();
    const {
        allTravels,
        loading,
        toggleFavorite,
        isFavorite,
        toggleCompare,
        canAddToCompare,
        isInCompare,
        compareList
    } = useTravel();

    if (loading) return <p className="text-center mt-5">Caricamento...</p>;

    const travel = allTravels.find(trip => String(trip.id) === id);

    if (!travel) {
        return <p className="text-center mt-5">Viaggio non trovato.</p>;
    }

    return (
        <div className="container py-5">
            <div className="row">
                {/* Card Immagine - Sinistra */}
                <div className="col-lg-7 col-md-12 mb-4">
                    <div className="card trip-detail-image-card">
                        {travel.img ? (
                            <img
                                src={travel.img}
                                alt={travel.title}
                                className="card-img-top trip-detail-image"
                            />
                        ) : (
                            <div className="trip-detail-placeholder">
                                <i className="fas fa-image fa-3x text-muted"></i>
                                <p className="text-muted mt-2">Immagine non disponibile</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card Dettagli - Destra */}
                <div className="col-lg-5 col-md-12 mb-4">
                    <div className="card trip-detail-info-card shadow border-0">
                        <div className="card-body p-4">
                            <h1 className="trip-detail-title mb-3 text-primary fs-3">{travel.title}</h1>

                            <div className="mb-3">
                                <span className="badge bg-primary fs-7 px-2 py-1 mb-2 d-block w-fit">
                                    <i className="fas fa-tag me-1"></i>
                                    {travel.category}
                                </span>
                                <div className="trip-price-badge fs-4 fw-bold text-success">
                                    €{travel.price}
                                    <small className="text-muted fs-7 fw-normal ms-1">a persona</small>
                                </div>
                            </div>

                            <div className="trip-info-section mb-4">
                                <h6 className="info-section-title mb-3 text-secondary fs-6">
                                    <i className="fas fa-info-circle me-1"></i>
                                    Dettagli del viaggio
                                </h6>

                                {travel.brand && (
                                    <div className="info-item mb-2 p-2 bg-light rounded">
                                        <i className="fas fa-tag text-primary me-2"></i>
                                        <span className="info-text"><strong>Brand:</strong> {travel.brand}</span>
                                    </div>
                                )}

                                {travel.durationDays && (
                                    <div className="info-item mb-2 p-2 bg-light rounded">
                                        <i className="fas fa-calendar-days text-success me-2"></i>
                                        <span className="info-text"><strong>Durata:</strong> {travel.durationDays} giorni</span>
                                    </div>
                                )}

                                <div className="info-item mb-2 p-2 bg-light rounded">
                                    <i className="fas fa-map-marker-alt text-danger me-2"></i>
                                    <span className="info-text"><strong>Tipo:</strong> {travel.category}</span>
                                </div>
                            </div>


                            <div className="trip-actions mt-3 d-flex gap-2 flex-wrap">
                                <button
                                    className={`btn ${isFavorite(travel.id) ? 'btn-danger' : 'btn-outline-danger'} btn-sm px-3 py-2 rounded-pill`}
                                    onClick={() => toggleFavorite(travel)}
                                >
                                    <i className="fas fa-heart me-1"></i>
                                    {isFavorite(travel.id) ? 'Rimuovi' : 'Preferiti'}
                                </button>

                                <button
                                    className={`btn ${isInCompare(travel.id) ? 'btn-info' : 'btn-outline-info'} btn-sm px-3 py-2 rounded-pill`}
                                    onClick={() => toggleCompare(travel)}
                                    disabled={!canAddToCompare(travel.id) && !isInCompare(travel.id)}
                                >
                                    <i className="fas fa-balance-scale me-1"></i>
                                    {isInCompare(travel.id) ? 'Rimuovi' : compareList.length >= 4 ? 'Limite' : 'Confronta'}
                                </button>
                            </div>

                            {compareList.length >= 4 && !isInCompare(travel.id) && (
                                <div className="alert alert-warning mt-3 py-2 d-flex align-items-center">
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    <small>Puoi confrontare solo 4 viaggi alla volta</small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Descrizione - Sotto */}
            <div className="row">
                <div className="col-12">
                    <div className="card trip-detail-description-card shadow border-0">
                        <div className="card-body p-4">
                            <h3 className="trip-description-title mb-3 text-primary">
                                <i className="fas fa-file-text me-2"></i>
                                Descrizione del Viaggio
                            </h3>
                            <div className="trip-description-content">
                                {travel.description ? (
                                    <p>{travel.description}</p>
                                ) : (
                                    <p className="text-muted">Descrizione non disponibile per questo viaggio.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}