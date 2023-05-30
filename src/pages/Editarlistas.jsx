/* eslint-disable react/prop-types */
import EditarListainput from "../componentes/EditarListaInput";
import { useEffect, useState } from "react";
import { onValue, ref, update, remove } from "firebase/database";
import { listasEnDB, db } from "../scripts/firebase";

export default function EditarListas() {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const cancelOnValue = onValue(listasEnDB, function (snapshot) {
      if (snapshot.val()) {
        setListas(Object.entries(snapshot.val()));
      } else {
        setListas([]);
      }
    });
    return cancelOnValue;
  }, []);

  function handleNuevoNombre(id, nuevoNombre) {
    const actualizar = {};
    actualizar[`/listas/${id}`] = { nombre: nuevoNombre };
    return update(ref(db), actualizar);
  }

  function borrarLista(id) {
    remove(ref(db, `/listas/${id}`));
  }

  const mapeo = listas.map((lista) => (
    <EditarListainput
      key={lista[0]}
      lista={lista}
      handleNuevoNombre={handleNuevoNombre}
      borrarLista={borrarLista}
    />
  ));

  return (
    <div className="editarlistas-container">
      <h2 className="listas-titulos">Borrar lista o editarla</h2>
      <div className="editarlista-input">{mapeo}</div>
    </div>
  );
}
