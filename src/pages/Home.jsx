import TableroTarjeta from "../componentes/TableroTarjeta";
export default function Home() {
  return (
    <main className="home-container">
      <div className="tablero">
        <TableroTarjeta
          src="/assest/reloj.png"
          alt="reloj"
          num="3"
          text="Fecha: 26/05/23"
          date={true}
          color="#ff0000"
        />
        <TableroTarjeta
          src="/assest/bandera.png"
          alt="bandera"
          num="7"
          text="Marcado"
          date={false}
          color=""
        />
        <TableroTarjeta
          src="/assest/easy.png"
          alt="mujer con ordenador"
          num="14"
          text="Prox 3 dias"
          date={false}
          color="#ff8A00"
        />
        <TableroTarjeta
          src="/assest/relax.png"
          alt="persona de relax"
          num="28"
          text="Prox 7 dias"
          date={false}
          color="#05ff00"
        />
      </div>
      <section className="home-lista-container"></section>
    </main>
  );
}
