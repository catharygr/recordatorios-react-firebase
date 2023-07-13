/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { MisRecordatioContext } from "../scripts/DataContext";
import { Link } from "react-router-dom";

export default function EditarListainput({
  lista,
  handleNuevoNombre,
  borrarLista,
}) {
  const id = lista[0];
  const oldNombre = lista[1].nombre;

  const contextoRecordatorios = useContext(MisRecordatioContext);

  const [nombreLista, setNombreLista] = useState(oldNombre);
  const [seEstaBorrando, setSeEstaBorrando] = useState(false);

  const numRecordatorio = contextoRecordatorios.filter(
    (recordatorio) => recordatorio[1].listaId === id
  ).length;

  function handleListaNombre(e) {
    setNombreLista(e.target.value);
  }
  // Cambio de nombre
  useEffect(() => {
    if (oldNombre === nombreLista) {
      return;
    }
    const timeOut = setTimeout(() => {
      handleNuevoNombre(id, nombreLista);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [nombreLista]);

  // Handle aplazar
  useEffect(() => {
    if (!seEstaBorrando) {
      return;
    }

    const cancelarTimeOut = setTimeout(() => borrarLista(id), 2000);

    return () => clearTimeout(cancelarTimeOut);
  }, [seEstaBorrando]);

  const btnRedCancelar = seEstaBorrando ? "cancelar-" : "";

  return (
    <div className="lista-form-componente">
      <button
        onClick={() => setSeEstaBorrando(!seEstaBorrando)}
        className={`${btnRedCancelar}delete-btn`}
      ></button>
      <input
        type="text"
        value={nombreLista}
        onChange={handleListaNombre}
        placeholder="Escribe el nombre de la lista"
      />
      <p className="lista-form--num-item">{numRecordatorio}</p>
      <Link to={`/lista/${id}`} className="tarjeta-recordatorio-flecha">
        <img src="/assets/flecha-derecha.png" alt="Flecha" />
      </Link>
    </div>
  );
}
