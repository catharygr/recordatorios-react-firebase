import "../style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import EditarListas from "./pages/Editarlistas";
import Ajustes from "./pages/Ajustes";
import NuevoRecordatorio from "./pages/NuevoRecordatorio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="editar-lista" element={<EditarListas />} />
          <Route path="ajustes" element={<Ajustes />} />
          <Route path="nuevo-recordatorio" element={<NuevoRecordatorio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
