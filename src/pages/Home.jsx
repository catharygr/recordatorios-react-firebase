import HomeListaTarjeta from "../componentes/HomeListaTarjeta";
import TableroTarjeta from "../componentes/TableroTarjeta";
import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";
import { Flag, BookOpen, Watch, Calendar } from "react-feather";
import { ref as refST, deleteObject } from "firebase/storage";
import { storageRef } from "../scripts/storage";
import { ref as refDB, remove, update } from "firebase/database";
import { db } from "../scripts/firebase";
import { useState } from "react";

import { useContext } from "react";
import {
  MisListaContext,
  MisRecordatioContext,
  MisUidContext,
} from "../scripts/DataContext";
// Listas,recordatorios, marcados, hoy, proximos

export default function Home() {
  const listas = useContext(MisListaContext);
  const recordatorios = useContext(MisRecordatioContext);
  const uidState = useContext(MisUidContext);
  const [homeTipo, setHomeTipo] = useState("marcados");

  // Funciones para actualizar y borrar recordatorios
  function handleNuevoNombre(id, nuevoNombre) {
    const actualizar = {};
    actualizar[`/recordatorios/${uidState}/${id}/titulo`] = nuevoNombre;
    return update(refDB(db), actualizar);
  }
  // Funcion para borrar recordatorios y su imagen
  function borrarRecordatorio(id, imagenName) {
    if (imagenName === "") {
      remove(refDB(db, `/recordatorios/${uidState}/${id}`));
    } else {
      const imagesRef = refST(storageRef, `/${uidState}`);
      const fileRef = refST(imagesRef, imagenName);
      deleteObject(fileRef).then(
        remove(refDB(db, `/recordatorios/${uidState}/${id}`))
      );
    }
  }

  // Por defecto se muestran todas las listas
  const misListas = listas.map((lista) => (
    <HomeListaTarjeta key={lista[0]} lista={lista} />
  ));

  // Para mostrar todos los recordatorios
  const todosLosRecordatorios = recordatorios.map((recordatorio) => (
    <TarjetaRecordatorio
      key={recordatorio[0]}
      recordatorio={recordatorio[1]}
      id={recordatorio[0]}
      handleNuevoNombre={handleNuevoNombre}
      borrarRecordatorio={borrarRecordatorio}
    />
  ));

  function handleFiltrar() {
    const filteredRecordatorios = recordatorios.filter((recordatorio) => {
      if (homeTipo === "marcados") {
        return recordatorio[1].marcado === true;
      }
      if (homeTipo === "hoy") {
        return recordatorio[1].date === "today";
      }
      if (homeTipo === "proximos") {
        return recordatorio[1].date === "next3days";
      }
      return null;
    });
    console.log(filteredRecordatorios);
    return filteredRecordatorios.map((recordatorio) => {
      return (
        <TarjetaRecordatorio
          key={recordatorio[0]}
          recordatorio={recordatorio[1]}
          id={recordatorio[0]}
          handleNuevoNombre={handleNuevoNombre}
          borrarRecordatorio={borrarRecordatorio}
        />
      );
    });
  }

  return (
    <main className="home-container">
      <section className="tablero">
        <TableroTarjeta
          img={<BookOpen color="var(--color-green)" />}
          num={recordatorios.length}
          text="Recordatorios"
          date={false}
          color="var(--color)"
        />
        <TableroTarjeta
          img={<Flag color="var(--color-red)" />}
          num="7"
          text="Marcados"
          date={false}
          color="var(--color)"
        />
        <TableroTarjeta
          img={<Watch color="var(--color-orange)" />}
          num="3"
          text="Fecha: 26/05/23"
          date={true}
          color="var(--color)"
        />
        <TableroTarjeta
          img={<Calendar color="var(--color-acentado)" />}
          num="14"
          text="Próx 3 dias"
          date={false}
          color="var(--color)"
        />
      </section>

      <section className="home-lista-container">
        <h2 className="listas-titulos">Mis listas</h2>
        {homeTipo === "listas" && misListas}
        {homeTipo === "recordatorios" && todosLosRecordatorios}
        {homeTipo === "marcados" && handleFiltrar()}
        {homeTipo === "hoy" && handleFiltrar()}
        {homeTipo === "proximos" && handleFiltrar()}
      </section>
    </main>
  );
}
