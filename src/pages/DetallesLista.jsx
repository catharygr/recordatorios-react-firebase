import { useParams } from "react-router-dom";
export default function DetallesLista() {
  const params = useParams();

  return (
    <section className="detalle-lista">
      <h2 className="listas-titulos">Nombre de la lista</h2>
      <div className="tarjeta-recordatorio-container">
        <button className="cancelar-delete-btn"></button>
        <input className="tarjeta-recordatorio-input" type="text" />
        <img
          className="tarjeta-recordatorio-img"
          src="/assets/bandera.png"
          alt=""
        />
      </div>
    </section>
  );
}
