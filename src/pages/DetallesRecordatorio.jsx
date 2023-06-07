/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { imagesRef } from "../scripts/storage";
import { recordatorioEnDB } from "../scripts/firebase";
import { update } from "firebase/database";
import { ref as refST, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { MisListaContext, MisRecordatioContext } from "../scripts/DataContext";

export default function DetallesRecordatorio() {
  const params = useParams();
  const todosLosRecordatorios = useContext(MisRecordatioContext);
  const listaContexto = useContext(MisListaContext);

  const filtrar = todosLosRecordatorios.filter(
    (recordatorio) => recordatorio[0] === params.id
  );
  const recordatorioId = filtrar[0][0];

  const [imagenSelec, setImagenSelec] = useState(null);
  const [form, setForm] = useState(filtrar[0][1]);

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

    const fileRef = refST(imagesRef, imagenSelec?.name);

    uploadBytes(fileRef, imagenSelec).then(() => {
      getDownloadURL(fileRef).then((url) => {
        setForm((oldData) => ({
          ...oldData,
          imageUrl: url,
        }));
      });
    });
  }, [imagenSelec]);

  // Obtener listado de nombre de las listas para opciones en selección
  const mapeoSeleccOpccion = listaContexto.map((lista) => (
    <option key={lista[0]} value={lista[0]}>
      {lista[1].nombre}
    </option>
  ));

  function handleActualizarRecordatorio() {
    const updates = {};
    updates[recordatorioId] = form;
    update(recordatorioEnDB, updates).then(navegate(`/lista/${form.listaId}`));
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
            onClick={handleActualizarRecordatorio}
            className="btn-guardar"
          >
            Actualizar
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
        <input
          id="cargar-imagen"
          type="file"
          accept="image/*"
          name="cargarImagen"
          onChange={handleSelecImagen}
        />
      </div>
    </div>
  );
}
