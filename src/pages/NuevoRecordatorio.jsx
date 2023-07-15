/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, useRef } from "react";
import { storageRef } from "../scripts/storage";
import { push, ref as refDB } from "firebase/database";
import { db } from "../scripts/firebase";
import {
  ref as refST,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { MisListaContext, MisUidContext } from "../scripts/DataContext";

export default function NuevoRecordatorio() {
  const listaContexto = useContext(MisListaContext);
  const { uidState } = useContext(MisUidContext);
  const [imagenSelec, setImagenSelec] = useState(null);
  const [form, setForm] = useState({
    usuarioId: "",
    listaId: "",
    titulo: "",
    nota: "",
    fecha: "",
    hora: "",
    marcado: false,
    imageUrl: "",
    imagenName: "",
  });
  // Activar o desactivar el boton basado si la lista está selecionada
  const estaSeleccionadaLalista = useRef(false);
  form.listaId
    ? (estaSeleccionadaLalista.current = true)
    : (estaSeleccionadaLalista.current = false);

  // console.log(form);
  const navegate = useNavigate();
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
    const imagesRef = refST(storageRef, `/${uidState}`);

    const fileRef = refST(imagesRef, imagenSelec?.name);

    uploadBytes(fileRef, imagenSelec).then(() => {
      getDownloadURL(fileRef).then((url) => {
        setForm((oldData) => ({
          ...oldData,
          imageUrl: url,
          imagenName: imagenSelec?.name,
        }));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagenSelec]);
  // Funcion para borrar imagen
  function HandleBorrarImg() {
    const imagesRef = refST(storageRef, `/${uidState}`);
    const fileRef = refST(imagesRef, form.imagenName);
    deleteObject(fileRef).then(
      setForm((oldData) => ({
        ...oldData,
        imageUrl: "",
        imagenName: "",
      }))
    );
  }

  // Obtener listado de nombre de las listas para opciones en selección
  const mapeoSeleccOpccion = listaContexto.map((lista) => (
    <option key={lista[0]} value={lista[0]}>
      {lista[1].nombre}
    </option>
  ));
  // Funcion para guardar recordatorio en la base de datos
  function handleGuardarRecordatorio() {
    push(refDB(db, `/recordatorios/${uidState}`), form).then(
      navegate(`/lista/${form.listaId}`)
    );
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
          <button
            disabled={!estaSeleccionadaLalista.current}
            onClick={handleGuardarRecordatorio}
            className="btn-guardar"
          >
            {!estaSeleccionadaLalista.current ? "Selecc lista" : "Guardar"}
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
            name="listaId"
            id="seleccionar-lista"
            onChange={handleForm}
            value={form.listaId}
          >
            <option value="">-- Seleccionar --</option>
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
        {form.imageUrl !== "" && <img src={form.imageUrl} alt="" />}
        {!form.imageUrl ? (
          <input
            id="cargar-imagen"
            type="file"
            accept="image/*"
            name="cargarImagen"
            onChange={handleSelecImagen}
          />
        ) : (
          <button onClick={HandleBorrarImg} className="borrar-img">
            Borrar Img
          </button>
        )}
      </div>
    </div>
  );
}
