/* eslint-disable react/prop-types */
export default function HomeListaTarjeta({ lista }) {
  let numRecordatorio = lista[1].recordatorios
    ? Object.keys(lista[1]?.recordatorios).length
    : 0;

  return (
    <section className="home-lista-container">
      <div className="home-lista-tarjeta">
        <h3>{lista[1]?.nombre}</h3>
        <p className="home-lista-tarjeta-num">{numRecordatorio}</p>
        <img src="/assets/bandera.png" alt="" />
      </div>
    </section>
  );
}
