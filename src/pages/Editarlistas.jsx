/* eslint-disable react/prop-types */
import EditarListainput from "../componentes/EditarListaInput";
import { MisListaContext } from "../scripts/DataContext";
import { useContext } from "react";
import { remove, update, ref } from "firebase/database";
import { db } from "../scripts/firebase";

export default function EditarListas() {
  const listas = useContext(MisListaContext);

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
