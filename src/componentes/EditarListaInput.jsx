/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function EditarListainput({
  lista,
  handleNuevoNombre,
  borrarLista,
}) {
  const id = lista[0];
  const oldNombre = lista[1].nombre;

  const [nombreLista, setNombreLista] = useState(oldNombre);
  const [seEstaBorrando, setSeEstaBorrada] = useState(false);

  let numRecordatorio = lista[1].recordatorios
    ? Object.keys(lista[1]?.recordatorios).length
    : 0;

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
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [nombreLista]);

  // Handle aplazar
  useEffect(() => {
    const cancelarTimeOut = setTimeout(() => borrarLista(id), 3000);

    return () => clearTimeout(cancelarTimeOut);
  }, [seEstaBorrando]);

  const btnRedCancelar = seEstaBorrando ? "cancelar-" : "";

  return (
    <div className="lista-form-componente">
      <button
        onClick={() => setSeEstaBorrada(!seEstaBorrando)}
        className={`${btnRedCancelar}delete-btn`}
      ></button>
      <input type="text" value={nombreLista} onChange={handleListaNombre} />
      <p className="lista-form--num-item">{numRecordatorio}</p>
    </div>
  );
}
