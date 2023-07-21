import { Link } from "react-router-dom";
import { MisRecordatioContext } from "../scripts/DataContext";
import { useContext } from "react";
import { ArrowRight } from "react-feather";

/* eslint-disable react/prop-types */
export default function HomeListaTarjeta({ lista }) {
  const recordatorios = useContext(MisRecordatioContext);

  const numRecordatorio = recordatorios.filter((recordatorio) => {
    return recordatorio[1].listaId === lista[0];
  }).length;

  return (
    <Link to={`lista/${lista[0]}`}>
      <div className="home-lista-tarjeta">
        <h3>{lista[1]?.nombre}</h3>
        <p className="home-lista-tarjeta-num">{numRecordatorio}</p>
        <ArrowRight color="var(--color-acentado)" />
      </div>
    </Link>
  );
}
