import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MisRecordatioContext } from "../scripts/DataContext";
import { ref as refDB, remove, update } from "firebase/database";
import { db } from "../scripts/firebase";

export default function DetallesLista() {
  const params = useParams();
  const listaRecordatorios = useContext(MisRecordatioContext);

  const filtrar = listaRecordatorios.filter(
    (recordatorio) => recordatorio[1].listaId === params.id
  );

  function handleNuevoNombre(id, nuevoNombre) {
    const actualizar = {};
    actualizar[`/recordatorio/${id}`] = { titulo: nuevoNombre };
    return update(refDB(db), actualizar);
  }

  function borrarRecordatorio(id) {
    remove(refDB(db, `/recordatorio/${id}`));
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
      <h2 className="listas-titulos">Supermercado</h2>

      {mapeo}
    </section>
  );
}
