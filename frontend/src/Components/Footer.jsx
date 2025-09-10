function Footer() {
    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-3">
                <div className="row">
                    {/* Sezione Principale */}
                    <div className="col-lg-6 col-md-6 mb-3">
                        <h5 className="mb-2">
                            <i className="fas fa-plane me-2 text-primary"></i>
                            Wanderlust
                        </h5>
                        <p className="text-light mb-2">
                            La tua agenzia di fiducia per scoprire destinazioni incredibili
                            e pianificare viaggi indimenticabili in tutto il mondo.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-light fs-5" title="Facebook">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="text-light fs-5" title="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-light fs-5" title="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-light fs-5" title="YouTube">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Sezione Informazioni Legali */}
                    <div className="col-lg-6 col-md-6 mb-3">
                        <h6 className="mb-2 text-primary">Informazioni Legali</h6>
                        <div className="row">
                            <div className="col-6">
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <a href="#" className="text-light text-decoration-none">
                                            <i className="fas fa-shield-alt me-2"></i>Privacy Policy
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="text-light text-decoration-none">
                                            <i className="fas fa-file-contract me-2"></i>Termini di Servizio
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="text-light text-decoration-none">
                                            <i className="fas fa-cookie me-2"></i>Cookie Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <a href="#" className="text-light text-decoration-none">
                                            <i className="fas fa-envelope me-2"></i>Contattaci
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="text-light text-decoration-none">
                                            <i className="fas fa-question-circle me-2"></i>FAQ
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="text-light text-decoration-none">
                                            <i className="fas fa-info-circle me-2"></i>Chi Siamo
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sezione Bottom */}
                <hr className="border-secondary my-2" />
                <div className="text-center">
                    <p className="mb-0 text-light">
                        © 2025 Wanderlust. Tutti i diritti riservati.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
