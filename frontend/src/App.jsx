import { BrowserRouter } from "react-router-dom";
import Layout from "./DefaultLayout/Layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <h2>Welcome to My App</h2>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

