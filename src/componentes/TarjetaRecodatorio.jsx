/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TarjetaRecordatorio({
  recordatorio,
  id,
  handleNuevoNombre,
  borrarRecordatorio,
}) {
  console.log(recordatorio);
  const oldTitulo = recordatorio.titulo;
  const [nombreDeRecordatotio, setNombreDeRecordatio] = useState(oldTitulo);
  const [seEstaBorrando, setSeEstaBorrando] = useState(false);

  // Funcion para cambiar el nombre
  function handleNombreDeRecordatorio(e) {
    setNombreDeRecordatio(e.target.value);
  }
  // Cambio de nombre
  useEffect(() => {
    if (oldTitulo === nombreDeRecordatotio) {
      return;
    }
    const timeOut = setTimeout(() => {
      handleNuevoNombre(id, nombreDeRecordatotio);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [nombreDeRecordatotio]);

  // Handle aplazar
  useEffect(() => {
    if (!seEstaBorrando) {
      return;
    }

    const cancelarTimeOut = setTimeout(() => borrarRecordatorio(id), 2000);

    return () => clearTimeout(cancelarTimeOut);
  }, [seEstaBorrando]);

  const btnRedCancelar = seEstaBorrando ? "cancelar-" : "";

  return (
    <div className="tarjeta-recordatorio-container">
      <button
        onClick={() => setSeEstaBorrando(!seEstaBorrando)}
        className={`${btnRedCancelar}delete-btn`}
      ></button>
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
