import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function EditarListainput({
  lista,
  handleNuevoNombre,
  borrarLista,
}) {
  const id = lista[0];
  const oldNombre = lista[1].nombre;

  const [nombreLista, setNombreLista] = useState(oldNombre);

  let numRecordatorio = lista[1].recordatorios
    ? Object.keys(lista[1]?.recordatorios).length
    : 0;

  function handleListaNombre(e) {
    setNombreLista(e.target.value);
  }
  useEffect(() => {
    if (oldNombre === nombreLista) {
      return;
    }
    const timeOut = setTimeout(() => {
      handleNuevoNombre(id, nombreLista);
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [nombreLista]);

  return (
    <div className="lista-form-componente">
      <button
        onClick={() => borrarLista(id)}
        className="delete-btn cancelar-delete-btn"
      ></button>
      <input type="text" value={nombreLista} onChange={handleListaNombre} />
      <p className="lista-form--num-item">{numRecordatorio}</p>
    </div>
  );
}
