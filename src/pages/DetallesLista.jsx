import { Outlet, useParams } from "react-router-dom";
import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";
import { useState, useEffect } from "react";
import { recordatorioEnDB } from "../scripts/firebase";
import { onValue } from "firebase/database";

export default function DetallesLista() {
  const [listaRecordatorios, setListaRecordatorios] = useState([]);
  console.log(listaRecordatorios);

  const params = useParams();

  useEffect(() => {
    const cancelOnValue = onValue(recordatorioEnDB, function (snapshot) {
      if (snapshot.val()) {
        const recordatorios = Object.entries(snapshot.val());
        const filtrar = recordatorios.filter(
          (recordatorio) => recordatorio[1].listaId === params.id
        );
        setListaRecordatorios(filtrar);
      } else {
        setListaRecordatorios([]);
      }
    });
    return cancelOnValue;
  }, [params.id]);
  const mapeo = listaRecordatorios.map((recordatorio) => (
    <TarjetaRecordatorio
      key={recordatorio[0]}
      data={recordatorio[1]}
      id={recordatorio[0]}
    />
  ));

  return (
    <section className="detalle-lista">
      <h2 className="listas-titulos">Nombre de la lista</h2>
      {mapeo}
      <Outlet />
    </section>
  );
}
