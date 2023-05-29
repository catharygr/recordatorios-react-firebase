import HomeListaTarjeta from "../componentes/HomeListaTarjeta";
import TableroTarjeta from "../componentes/TableroTarjeta";
export default function Home() {
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
        <HomeListaTarjeta />
        <HomeListaTarjeta />
        <HomeListaTarjeta />
        <HomeListaTarjeta />
        <HomeListaTarjeta />
        <HomeListaTarjeta />
        <HomeListaTarjeta />
        <HomeListaTarjeta />
        <HomeListaTarjeta />
      </section>
    </main>
  );
}
