import { useState } from "react";
import Ajustes from "./Ajustes";

export default function BarraFooter() {
  const [nuevoRecordatorioVisible, setNuevoRecordatorioVisible] =
    useState(false);

  function manejarVisibilidad() {
    setNuevoRecordatorioVisible((oldValue) => !oldValue);
  }
  return (
    <div>
      <footer className="barra-footer-container">
        <button onClick={manejarVisibilidad}>+Nuevo recordatorio</button>
      </footer>
      {nuevoRecordatorioVisible && (
        <Ajustes manejarVisibilidad={manejarVisibilidad} />
      )}
    </div>
  );
}
