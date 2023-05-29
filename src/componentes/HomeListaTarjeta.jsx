/* eslint-disable react/prop-types */
export default function HomeListaTarjeta({ lista }) {
  let numRecordatorio = 0;

  if (lista[1].recordatorios) {
    numRecordatorio = Object.keys(lista[1]?.recordatorios);
  }
  return (
    <section className="home-lista-container">
      <div className="home-lista-tarjeta">
        <h3>{lista[1]?.nombre}</h3>
        <p className="home-lista-tarjeta-num">{numRecordatorio.length}</p>
        <img src="/assets/bandera.png" alt="" />
      </div>
    </section>
  );
}
