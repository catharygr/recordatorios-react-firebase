import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function HomeListaTarjeta({ lista }) {
  let numRecordatorio = lista[1].recordatorios
    ? Object.keys(lista[1]?.recordatorios).length
    : 0;

  return (
    <Link to={`lista/${lista[0]}`}>
      <div className="home-lista-tarjeta">
        <h3>{lista[1]?.nombre}</h3>
        <p className="home-lista-tarjeta-num">{numRecordatorio}</p>
        <img src="/assets/bandera.png" alt="" />
      </div>
    </Link>
  );
}
