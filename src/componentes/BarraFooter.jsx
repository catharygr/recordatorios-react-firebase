import { useState } from "react";
import NuevoRecordatotio from "./NuevoRecordatorio";

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
        <NuevoRecordatotio manejarVisibilidad={manejarVisibilidad} />
      )}
    </div>
  );
}
