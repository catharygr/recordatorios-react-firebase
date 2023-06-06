import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MisRecordatioContext } from "../scripts/DataContext";

export default function DetallesLista() {
  const params = useParams();
  const listaRecordatorios = useContext(MisRecordatioContext);

  const filtrar = listaRecordatorios.filter(
    (recordatorio) => recordatorio[1].listaId === params.id
  );
  const mapeo = filtrar.map((recordatorio) => (
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
    </section>
  );
}
