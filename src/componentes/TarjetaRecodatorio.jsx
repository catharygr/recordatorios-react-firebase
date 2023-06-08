/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TarjetaRecordatorio({ recordatorio, id }) {
  console.log(recordatorio);
  const [nombreDeRecordatotio, setNombreDeRecordatio] = useState("");
  function handleNombreDeRecordatorio(e) {
    setNombreDeRecordatio(e.target.value);
  }
  return (
    <div className="tarjeta-recordatorio-container">
      <button className="cancelar-delete-btn"></button>
      <input
        className="tarjeta-recordatorio-input"
        type="text"
        value={nombreDeRecordatotio}
        onChange={handleNombreDeRecordatorio}
      />
      {recordatorio.marcado && (
        <img
          className="tarjeta-recordatorio-marcado"
          src="/assets/bandera.png"
          alt="Bandera"
        />
      )}
      <Link to={`/recordatorio/${id}`} className="tarjeta-recordatorio-flecha">
        <img src="/assets/flecha-derecha.png" alt="Flecha" />
      </Link>
    </div>
  );
}
