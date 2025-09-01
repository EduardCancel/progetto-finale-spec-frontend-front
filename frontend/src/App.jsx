import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Compare from "./Pages/Compare";
import Favorites from "./Pages/Favorites";
import Layout from "./DefaultLayout/Layout";
import { TravelProvider } from "./GlobalContext/GlobalContext";
import "./App.css";
import TripDetail from "./Pages/TripDetail";

function App() {
  return (
    <TravelProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/trips/:id" element={<TripDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TravelProvider>
  );
}

export default App;
