import { useParams } from "react-router-dom";
import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";
export default function DetallesLista() {
  const params = useParams();

  return (
    <section className="detalle-lista">
      <h2 className="listas-titulos">Nombre de la lista</h2>
      <TarjetaRecordatorio />
      <TarjetaRecordatorio />
      <TarjetaRecordatorio />
      <TarjetaRecordatorio />
      <TarjetaRecordatorio />
    </section>
  );
}
