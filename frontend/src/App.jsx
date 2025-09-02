import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TravelProvider } from "./GlobalContext/GlobalContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import TripDetail from "./Pages/TripDetail";
import Compare from "./Pages/Compare";
import Favorites from "./Pages/Favorites";
import "./App.css";

function App() {
  return (
    <TravelProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trips/:id" element={<TripDetail />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TravelProvider>
  );
}

export default App;
