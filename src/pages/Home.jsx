import HomeListaTarjeta from "../componentes/HomeListaTarjeta";
import TableroTarjeta from "../componentes/TableroTarjeta";
import { Flag, BookOpen, Watch, Calendar } from "react-feather";

import { useContext } from "react";
import { MisListaContext } from "../scripts/DataContext";

export default function Home() {
  const listas = useContext(MisListaContext);

  const mapeo = listas.map((lista) => (
    <HomeListaTarjeta key={lista[0]} lista={lista} />
  ));
  return (
    <main className="home-container">
      <section className="tablero">
        <TableroTarjeta
          img={<BookOpen color="var(--color-green)" />}
          num="28"
          text="Recordatorios"
          date={false}
          color="var(--color)"
        />
        <TableroTarjeta
          img={<Flag color="var(--color-red)" />}
          num="7"
          text="Marcados"
          date={false}
          color="var(--color)"
        />
        <TableroTarjeta
          img={<Watch color="var(--color-orange)" />}
          num="3"
          text="Fecha: 26/05/23"
          date={true}
          color="var(--color)"
        />
        <TableroTarjeta
          img={<Calendar color="var(--color-acentado)" />}
          num="14"
          text="Próx 3 dias"
          date={false}
          color="var(--color)"
        />
      </section>

      <section className="home-lista-container">
        <h2 className="listas-titulos">Mis listas</h2>
        {mapeo}
      </section>
    </main>
  );
}
