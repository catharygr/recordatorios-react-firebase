/* eslint-disable react/prop-types */
export default function Ajustes({ manejarVisibilidad }) {
  return (
    <div className="ajustes-container">
      <div className="ajuste-container--barra">
        <button onClick={() => manejarVisibilidad("ajustes")}>Return</button>
      </div>
      <div className="ajustes-listas">
        <p>Modo claro</p>
        <p>Salir</p>
      </div>
    </div>
  );
}
