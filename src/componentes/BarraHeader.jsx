import { useState } from "react";
import Ajustes from "./Ajustes";
import EditarList from "./Editarlistas";

export default function BarraHeader() {
  const [ajusteVisible, setAjusteVisible] = useState(false);
  const [editarListasVisible, setEditarListasVisible] = useState(false);

  function manejarVisibilidad(cualBoton) {
    cualBoton === "listas" && setEditarListasVisible((oldValue) => !oldValue);
    cualBoton === "ajustes" && setAjusteVisible((oldValue) => !oldValue);
  }

  return (
    <div>
      <header className="barra-ajustes-container">
        <button onClick={() => manejarVisibilidad("listas")}>
          Editar listas
        </button>
        <button onClick={() => manejarVisibilidad("ajustes")}>Ajustes</button>
      </header>
      {editarListasVisible && (
        <EditarList manejarVisibilidad={manejarVisibilidad} />
      )}
      {ajusteVisible && <Ajustes manejarVisibilidad={manejarVisibilidad} />}
    </div>
  );
}
