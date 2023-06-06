/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function TarjetaRecordatorio({ data, id }) {
  return (
    <div className="tarjeta-recordatorio-container">
      <button className="cancelar-delete-btn"></button>
      <input className="tarjeta-recordatorio-input" type="text" />
      {data.marcado && (
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
