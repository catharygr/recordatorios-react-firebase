import { useState } from "react";
import Ajustes from "./Ajustes";
import EditarList from "./Editarlistas";

export default function BarraAjustes() {
  const [ajusteVisible, setAjusteVisible] = useState(false);
  const [editarListasVisible, setEditarListasVisible] = useState(false);

  function ManejarVisibilidad(cualBoton) {}

  return (
    <div className="barraAjustes-container">
      <button onClick={() => ManejarVisibilidad("ajustes")}>Ajustes</button>
      <button onClick={() => ManejarVisibilidad("listas")}>
        Editar listas
      </button>
      {ajusteVisible && <Ajustes />}
      {editarListasVisible && <EditarList />}
    </div>
  );
}
