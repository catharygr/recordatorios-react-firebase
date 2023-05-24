import Listainput from "./ListaInput";

/* eslint-disable react/prop-types */
export default function EditarListas({ manejarVisibilidad }) {
  return (
    <div className="listas-container">
      <div className="lista-container--barra">
        <button onClick={() => manejarVisibilidad("listas")}>Return</button>
      </div>
      <div className="mis-listas">
        <h2 className="listas-titulos">Mis listas</h2>
        <Listainput />
        <Listainput />
        <Listainput />
        <Listainput />
      </div>
    </div>
  );
}
