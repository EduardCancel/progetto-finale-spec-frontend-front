import { useTravel } from "../GlobalContext/GlobalContext";
import { Link } from "react-router-dom";

export default function HomePage() {
    const { filteredTravels, loading } = useTravel();

    if (loading) return <p className="text-center mt-5">Caricamento...</p>;

    return (
        <div className="container">
            <h1 className="mb-4 text-center">Viaggi disponibili</h1>
            <div className="row">
                {filteredTravels.map(travel => (
                    <div className="col-md-4 mb-4" key={travel.id}>
                        <div className="card shadow card-travel h-100">
                            {travel.img && (
                                <img
                                    src={travel.img}
                                    alt={travel.title}
                                    className="card-img-top"
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{travel.title}</h5>
                                <p className="card-text mb-1">
                                    <span className="badge bg-primary">{travel.category}</span>
                                </p>
                                <p className="card-text fw-bold text-success mb-2">€{travel.price}</p>
                                <div className="mt-auto">
                                    <Link to={`/trips/${travel.id}`} className="btn btn-outline-primary w-100">
                                        Dettagli
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}