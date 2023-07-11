import "../style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import EditarListas from "./pages/Editarlistas";
import Ajustes from "./pages/Ajustes";
import NuevoRecordatorio from "./pages/NuevoRecordatorio";
import DetallesLista from "./pages/DetallesLista";
import DetallesRecordatorio from "./pages/DetallesRecordatorio";
import Loguear from "./pages/Loguear";
import AuthRequerido from "./pages/AuthRequerido";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRequerido />}>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="editar-lista" element={<EditarListas />} />
            <Route path="ajustes" element={<Ajustes />} />
            <Route path="nuevo-recordatorio" element={<NuevoRecordatorio />} />
            <Route path="lista/:id" element={<DetallesLista />} />
            <Route path="recordatorio/:id" element={<DetallesRecordatorio />} />
          </Route>
        </Route>
        <Route path="/loguear" element={<Loguear />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
