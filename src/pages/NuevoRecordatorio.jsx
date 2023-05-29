/* eslint-disable react/prop-types */
export default function NuevoRecordatorio() {
  return (
    <div className="nuevo-recordatorio-container">
      <form className="lista-nuevo-recordatorio">
        <label htmlFor="titulo">Recordatorio</label>
        <input id="titulo" type="text" />
        <label htmlFor="nota">Nota</label>
        <textarea id="nota" cols="3" />

        <div className="form-elemento-container">
          <label htmlFor="fecha">Elegir fecha</label>
          <input type="date" id="fecha" placeholder="Elegir la fecha" />
        </div>

        <div className="form-elemento-container">
          <label htmlFor="hora">Elegir Hora</label>
          <input id="hora" type="time" placeholder="Elegir la hora" />
        </div>

        <div className="form-elemento-container">
          <label htmlFor="seleccionar-lista">Seleccionar lista</label>
          <select name="" id="seleccionar-lista">
            <option>Supermecado</option>
            <option>Supermecado</option>
            <option>Supermecado</option>
            <option>Supermecado</option>
          </select>
        </div>

        <div className="form-elemento-container">
          <label htmlFor="marcado">Marcado</label>
          <input id="marcado" type="checkbox" />
        </div>

        <label htmlFor="cargar-imagen">Cargar imagen</label>
        <input id="cargar-imagen" type="file" />
      </form>
    </div>
  );
}
