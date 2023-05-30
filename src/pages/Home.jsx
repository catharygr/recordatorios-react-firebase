import { onValue } from "firebase/database";
import HomeListaTarjeta from "../componentes/HomeListaTarjeta";
import TableroTarjeta from "../componentes/TableroTarjeta";
import { listasEnDB } from "../scripts/firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const [listas, setListas] = useState([]);
  useEffect(() => {
    const cancelOnValue = onValue(listasEnDB, function (snapshot) {
      if (snapshot.val()) {
        setListas(Object.entries(snapshot.val()));
      } else {
        setListas([]);
      }
    });
    return cancelOnValue;
  }, []);
  const mapeo = listas.map((lista) => (
    <HomeListaTarjeta key={lista[0]} lista={lista} />
  ));
  return (
    <main className="home-container">
      <div className="tablero">
        <TableroTarjeta
          src="/assets/reloj.png"
          alt="reloj"
          num="3"
          text="Fecha: 26/05/23"
          date={true}
          color="var(--color-red)"
        />
        <TableroTarjeta
          src="/assets/bandera.png"
          alt="bandera"
          q
          num="7"
          text="Marcado"
          date={false}
          color="var(--color)"
        />
        <TableroTarjeta
          src="/assets/easy.png"
          alt="mujer con ordenador"
          num="14"
          text="Próx 3 dias"
          date={false}
          color="var(--color-orange)"
        />
        <TableroTarjeta
          src="/assets/relax.png"
          alt="persona de relax"
          num="28"
          text="Próx 7 dias"
          date={false}
          color="var(--color-green)"
        />
      </div>

      <section className="home-lista-container">
        <h2 className="listas-titulos">Mis listas</h2>
        {mapeo}
      </section>
    </main>
  );
}
