import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TravelProvider } from "./GlobalContext/GlobalContext";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import TripDetail from "./Pages/TripDetail";
import Compare from "./Pages/Compare";
import Favorites from "./Pages/Favorites";
import "./App.css";

function App() {
  return (
    <TravelProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </TravelProvider>
  );
}

export default App;
