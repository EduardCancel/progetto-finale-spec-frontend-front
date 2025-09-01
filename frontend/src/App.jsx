import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Trips from "./Pages/Trips";
import Compare from "./Pages/Compare";
import Favorites from "./Pages/Favorites";
import Layout from "./DefaultLayout/Layout";
import { TravelProvider } from "./GlobalContext/GlobalContext"; // importa il provider
import "./App.css";

function App() {
  return (
    <TravelProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TravelProvider>
  );
}

export default App;
