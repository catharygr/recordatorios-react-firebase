import { Outlet } from "react-router-dom";
import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";

import { useContext } from "react";

import { MisRecordatioContext } from "../scripts/DataContext";

export default function DetallesLista() {
  const listaRecordatorios = useContext(MisRecordatioContext);

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
