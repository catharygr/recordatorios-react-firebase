import { useState } from "react";
import Ajustes from "./Ajustes";
import EditarList from "./Editarlistas";

export default function BarraAjustes() {
  const [ajusteVisible, setAjusteVisible] = useState(false);
  const [editarListasVisible, setEditarListasVisible] = useState(false);

  function manejarVisibilidad(cualBoton) {
    cualBoton === "listas" && setEditarListasVisible((oldValue) => !oldValue);
    cualBoton === "ajustes" && setAjusteVisible((oldValue) => !oldValue);
  }

  return (
    <>
      <div className="barraAjustes-container">
        <button onClick={() => manejarVisibilidad("listas")}>
          Editar listas
        </button>
        <button onClick={() => manejarVisibilidad("ajustes")}>Ajustes</button>
      </div>
      {editarListasVisible && (
        <EditarList manejarVisibilidad={manejarVisibilidad} />
      )}
      {ajusteVisible && <Ajustes manejarVisibilidad={manejarVisibilidad} />}
    </>
  );
}
