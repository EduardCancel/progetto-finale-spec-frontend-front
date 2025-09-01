import { useParams } from "react-router-dom";
import { useTravel } from "../GlobalContext/GlobalContext";

export default function TripDetail() {
    const { id } = useParams();
    const { allTravels, loading } = useTravel();

    if (loading) return <p className="text-center mt-5">Caricamento...</p>;

    const travel = allTravels.find(trip => String(trip.id) === id);

    if (!travel) {
        return <p className="text-center mt-5">Viaggio non trovato.</p>;
    }

    return (
        <div className="container py-5">
            <div className="row">
                {/* Card Immagine - Sinistra */}
                <div className="col-lg-6 col-md-12 mb-4">
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
                <div className="col-lg-6 col-md-12 mb-4">
                    <div className="card trip-detail-info-card">
                        <div className="card-body p-4">
                            <h1 className="trip-detail-title">{travel.title}</h1>

                            <div className="d-flex align-items-center mb-3">
                                <span className="badge bg-primary me-3">{travel.category}</span>
                                <div className="trip-price-badge">
                                    €{travel.price}
                                </div>
                            </div>

                            <div className="trip-info-section">
                                <h6 className="info-section-title">Dettagli del viaggio</h6>

                                {travel.brand && (
                                    <div className="info-item">
                                        <i className="fas fa-tag text-primary me-2"></i>
                                        <span className="info-text"><strong>Brand:</strong> {travel.brand}</span>
                                    </div>
                                )}

                                {travel.durationDays && (
                                    <div className="info-item">
                                        <i className="fas fa-calendar-days text-success me-2"></i>
                                        <span className="info-text"><strong>Durata:</strong> {travel.durationDays} giorni</span>
                                    </div>
                                )}

                                <div className="info-item">
                                    <i className="fas fa-map-marker-alt text-danger me-2"></i>
                                    <span className="info-text"><strong>Tipo:</strong> {travel.category}</span>
                                </div>
                            </div>

                            <div className="trip-actions">
                                <button className="btn btn-outline-danger me-2 mb-2">
                                    <i className="fas fa-heart me-1"></i>
                                    Preferiti
                                </button>
                                <button className="btn btn-outline-info mb-2">
                                    <i className="fas fa-balance-scale me-1"></i>
                                    Confronta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Descrizione - Sotto */}
            <div className="row">
                <div className="col-12">
                    <div className="card trip-detail-description-card">
                        <div className="card-body">
                            <h3 className="trip-description-title">
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