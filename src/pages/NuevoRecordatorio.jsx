import { useState } from "react";

/* eslint-disable react/prop-types */
export default function NuevoRecordatorio() {
  const [form, setForm] = useState({
    titulo: "",
    nota: "",
    fecha: "",
    hora: "",
    seleccionarLista: "",
    marcado: true,
  });
  function handleForm(e) {
    e.preventDefault();
  }
  return (
    <div className="nuevo-recordatorio-container">
      <form className="lista-nuevo-recordatorio">
        <label htmlFor="titulo">Titulo</label>
        <input
          id="titulo"
          type="text"
          onChange={handleForm}
          name="titulo"
          value={form.titulo}
        />
        <label htmlFor="nota">Nota</label>
        <textarea
          id="nota"
          cols="3"
          name="nota"
          onChange={handleForm}
          value={form.nota}
        />

        <div className="form-elemento-container">
          <label htmlFor="fecha">Elegir fecha</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            onChange={handleForm}
            value={form.fecha}
          />
        </div>

        <div className="form-elemento-container">
          <label htmlFor="hora">Elegir hora</label>
          <input
            id="hora"
            type="time"
            name="hora"
            onChange={handleForm}
            value={form.hora}
          />
        </div>

        <div className="form-elemento-container">
          <label htmlFor="seleccionar-lista">Seleccionar lista</label>
          <select
            name="sellecionarLista"
            id="seleccionar-lista"
            onChange={handleForm}
            value={form.seleccionarLista}
          >
            <option value="Supermecado">Supermecado</option>
            <option value="Supermecado">Supermecado</option>
            <option value="Supermecado">Supermecado</option>
            <option value="Supermecado">Supermecado</option>
          </select>
        </div>

        <div className="form-elemento-container">
          <label htmlFor="marcado">Marcado</label>
          <input
            id="marcado"
            type="checkbox"
            name="marcado"
            checked={form.marcado}
            onChange={handleForm}
          />
        </div>

        <label htmlFor="cargar-imagen">Cargar imagen</label>
        <input
          id="cargar-imagen"
          type="file"
          name="cargarImagen"
          value={form.cargarImagen}
        />
      </form>
    </div>
  );
}
