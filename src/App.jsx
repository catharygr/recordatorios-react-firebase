import "../style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarraAjustes from "./componentes/BarraAjustes";
import Home from "./pages/Home";

function App() {
  return (
    <main className="main-container">
      <BrowserRouter>
        <BarraAjustes />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
