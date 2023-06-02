import { useEffect, useState } from "react";
import { imagesRef } from "../scripts/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* eslint-disable react/prop-types */
export default function NuevoRecordatorio() {
  const [imagenSelec, setImagenSelec] = useState(null);

  const [form, setForm] = useState({
    titulo: "",
    nota: "",
    fecha: "",
    hora: "",
    seleccionarLista: "",
    marcado: false,
    imageUrl: "",
  });
  // Manehar formulario y su State via onChange
  function handleForm(e) {
    const { name, value, checked, type } = e.target;

    setForm((oldData) => ({
      ...oldData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  //Guardar la imagen seleccionada en imagenSelec
  function handleSelecImagen(e) {
    setImagenSelec(e.target.files[0]);
  }
  // al seleccionar imagen subirla a firebase Storage
  useEffect(() => {
    if (!imagenSelec) return;

    const fileRef = ref(imagesRef, imagenSelec?.name);

    uploadBytes(fileRef, imagenSelec).then(() => {
      getDownloadURL(fileRef).then((url) => {
        setForm((oldData) => ({
          ...oldData,
          imageUrl: url,
        }));
      });
    });
  }, [imagenSelec]);

  console.log(form.imageUrl);

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
          <label htmlFor="seleccionar-lista">Seleccionar lista</label>
          <select
            name="seleccionarLista"
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
          onChange={handleSelecImagen}
        />
      </form>
    </div>
  );
}
