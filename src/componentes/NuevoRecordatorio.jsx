/* eslint-disable react/prop-types */
export default function NuevoRecordatorio({ manejarVisibilidad }) {
  return (
    <div className="ajustes-container">
      <div className="ajuste-container--barra">
        <button onClick={() => manejarVisibilidad("ajustes")}>Guardar</button>
      </div>
      <form className="lista-nuevo-recordatorio">
        <label htmlFor="titulo">Titulo</label>
        <input id="titulo" type="text" placeholder="Nuevo recordatorio" />
        <label htmlFor="nota">Nota</label>
        <textarea placeholder="Text area" id="nota" cols="3" />
        <label htmlFor="fecha">Fecha</label>
        <input type="date" id="fecha" />
        <label htmlFor="hora">Hora</label>
        <input id="hora" type="time" />
        <label htmlFor="seleccionar-lista">Seleccionar lista</label>
        <select name="" id="seleccionar-lista">
          <option>Supermecado</option>
          <option>Supermecado</option>
          <option>Supermecado</option>
          <option>Supermecado</option>
        </select>
        <label htmlFor="marcado">Marcado</label>
        <input id="marcado" type="checkbox" checked />
        <label htmlFor="cargar-imagen">Cargar imagen</label>
        <input id="cargar-imagen" type="file" />
      </form>
    </div>
  );
}
