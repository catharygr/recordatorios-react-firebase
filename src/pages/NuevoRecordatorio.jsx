/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { imagesRef } from "../scripts/storage";
import { listasEnDB, db } from "../scripts/firebase";
import { onValue, ref as refDB, update, push, child } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function NuevoRecordatorio() {
  const [imagenSelec, setImagenSelec] = useState(null);
  const [listas, setListas] = useState([]);

  const [form, setForm] = useState({
    titulo: "",
    nota: "",
    fecha: "",
    hora: "",
    seleccionarLista: "",
    marcado: false,
    imageUrl: "",
  });
  // Manejar formulario y su State via onChange
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
  // Al seleccionar imagen subirla a firebase Storage
  // Obtener el URl de descarga y gurdarlo en el state del recordatorio
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

  // Obtener los nombres de las listas para mapear para el elemento selección de formulario
  useEffect(() => {
    const cancelOnValue = onValue(listasEnDB, function (snapshot) {
      if (snapshot.val()) {
        setListas(Object.entries(snapshot.val()));
      } else {
        setListas([]);
      }
    });
    return cancelOnValue;
  }, []);
  // Obtener listado de nombre de las listas para opciones en selección
  const mapeoSeleccOpccion = listas.map((lista) => (
    <option key={lista[0]} value={lista[0]}>
      {lista[1].nombre}
    </option>
  ));

  function handleGuardarRecordatorio() {
    const newPostKey = push(
      child(listasEnDB, `listas/${form.seleccionarLista}/items`)
    ).key;
    const updates = {};
    console.log(updates);
    updates[`listas/${form.seleccionarLista}/items/${newPostKey}`] = form;
    update(refDB(db), updates);
  }

  return (
    <div className="nuevo-recordatorio-container">
      <div className="lista-nuevo-recordatorio">
        <label htmlFor="titulo">Titulo</label>
        <div className="titulo-btn-container">
          <input
            id="titulo"
            type="text"
            onChange={handleForm}
            name="titulo"
            value={form.titulo}
          />
          <button onClick={handleGuardarRecordatorio} className="btn-guardar">
            Guardar
          </button>
        </div>
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
            {mapeoSeleccOpccion}
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
      </div>
    </div>
  );
}
