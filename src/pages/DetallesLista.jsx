import { Outlet, useParams } from "react-router-dom";
import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";
import { useState, useEffect, useContext } from "react";
import { recordatorioEnDB } from "../scripts/firebase";
import { onValue } from "firebase/database";
import { MisListaContext } from "../scripts/DataContext";

export default function DetallesLista() {
  const [listaRecordatorios, setListaRecordatorios] = useState([]);
  // const listasConsumer = useContext(MisListaContext);

  const params = useParams();

  // const findLista = listasConsumer.find((lista) => lista[0] === params.id);
  // const nombreLista = findLista[1].nombre;
  // const IdLista = findLista[0];

  const mapeo = listaRecordatorios.map((recordatorio) => (
    <TarjetaRecordatorio
      key={recordatorio[0]}
      data={recordatorio[1]}
      id={recordatorio[0]}
    />
  ));

  return (
    <section className="detalle-lista">
      <h2 className="listas-titulos">Supermercado</h2>

      {mapeo}
      <Outlet />
    </section>
  );
}
