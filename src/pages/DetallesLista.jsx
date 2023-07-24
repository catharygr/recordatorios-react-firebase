import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import {
  MisRecordatioContext,
  MisUidContext,
  MisListaContext,
} from "../scripts/DataContext";
import { ref as refST, deleteObject } from "firebase/storage";
import { storageRef } from "../scripts/storage";
import { ref as refDB, remove, update } from "firebase/database";
import { db } from "../scripts/firebase";

export default function DetallesLista() {
  const params = useParams();
  const listaRecordatorios = useContext(MisRecordatioContext);
  const todasLasListas = useContext(MisListaContext);
  const { uidState } = useContext(MisUidContext);

  const filtrar = listaRecordatorios.filter(
    (recordatorio) => recordatorio[1].listaId === params.id
  );

  // Filtrar listas para obtener el nombre de la lista actual
  const listaActual = todasLasListas.filter((lista) => lista[0] === params.id);
  const nombreLista = listaActual[0][1].nombre;

  // Funciones para actualizar y borrar recordatorios
  function handleNuevoNombre(id, nuevoNombre) {
    const actualizar = {};
    actualizar[`/recordatorios/${uidState}/${id}/titulo`] = nuevoNombre;
    return update(refDB(db), actualizar);
  }

  // Funcion para borrar recordatorios y su imagen
  function borrarRecordatorio(id, imagenName) {
    if (imagenName === "") {
      remove(refDB(db, `/recordatorios/${uidState}/${id}`));
    } else {
      const imagesRef = refST(storageRef, `/${uidState}`);
      const fileRef = refST(imagesRef, imagenName);
      deleteObject(fileRef).then(
        remove(refDB(db, `/recordatorios/${uidState}/${id}`))
      );
    }
  }

  const mapeo = filtrar.map((recordatorio) => (
    <TarjetaRecordatorio
      key={recordatorio[0]}
      recordatorio={recordatorio[1]}
      id={recordatorio[0]}
      handleNuevoNombre={handleNuevoNombre}
      borrarRecordatorio={borrarRecordatorio}
    />
  ));

  return (
    <section className="detalle-lista">
      <h2 className="listas-titulos">{nombreLista}</h2>

      {mapeo}
    </section>
  );
}
