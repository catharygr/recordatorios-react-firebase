/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flag } from "react-feather";

export default function TarjetaRecordatorio({
  recordatorio,
  id,
  handleNuevoNombre,
  borrarRecordatorio,
}) {
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

    const cancelarTimeOut = setTimeout(
      () => borrarRecordatorio(id, recordatorio?.imagenName),
      2000
    );

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
        // <img
        //   className="tarjeta-recordatorio-marcado"
        //   src="/assets/bandera.png"
        //   alt="Bandera"
        // />
        <Flag
          className="tarjeta-recordatorio-marcado"
          color="var(--color-red)"
        />
      )}
      <Link to={`/recordatorio/${id}`} className="icono-flecha">
        <ArrowRight color="var(--color-acentado)" />
      </Link>
    </div>
  );
}
