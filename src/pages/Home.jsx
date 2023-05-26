export default function Home() {
  return (
    <main className="home-container">
      <div className="tablero">
        <div className="tablero-tarjeta">
          <div className="tablero-tarjeta--primera-fila">
            <img
              className="tablero-tarjeta--img"
              src="/assest/reloj.png"
              alt="Icono de reloj"
            />
            <p className="tablero-tarjeta--num">5</p>
          </div>
          <p className="tablero-tarjeta--fecha">fecha: 26/07/23</p>
        </div>
      </div>
      <section className="home-lista-container"></section>
    </main>
  );
}
