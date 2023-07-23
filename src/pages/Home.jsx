import HomeListaTarjeta from "../componentes/HomeListaTarjeta";
import TableroTarjeta from "../componentes/TableroTarjeta";
import TarjetaRecordatorio from "../componentes/TarjetaRecodatorio";
import { Flag, BookOpen, Watch, Calendar } from "react-feather";
import { ref as refST, deleteObject } from "firebase/storage";
import { storageRef } from "../scripts/storage";
import { ref as refDB, remove, update } from "firebase/database";
import { db } from "../scripts/firebase";
import { useContext } from "react";

import {
  MisListaContext,
  MisRecordatioContext,
  MisUidContext,
  MisTipoHomeContext,
} from "../scripts/DataContext";
// Listas,recordatorios, marcados, hoy, proximos

export default function Home() {
  const listas = useContext(MisListaContext);
  const recordatorios = useContext(MisRecordatioContext);
  const { uidState } = useContext(MisUidContext);
  const { homeTipo, setHomeTipo } = useContext(MisTipoHomeContext);

  // Funciones para actualizar y borrar recordatorios
  function handleNuevoNombre(id, nuevoNombre) {
    console.log(id, nuevoNombre);
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

  // Funcion que compara dos fechas para ver si hay menos de tres dias de diferencia
  function compareDates(date1, date2) {
    const date1Obj = new Date(date1);
    const date2Obj = new Date(date2);
    if (date1Obj > date2Obj) return false;
    const diffTime = Math.abs(date2Obj - date1Obj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }

  // Filtrar marcados
  const marcadas = recordatorios.filter((recordatorio) => {
    return recordatorio[1].marcado === true;
  });
  // Filtrar hoy
  const hoy = recordatorios.filter((recordatorio) => {
    const fechaEnDB = new Date(recordatorio[1].fecha).toLocaleDateString();
    const fechaHoy = new Date().toLocaleDateString();
    return fechaEnDB === fechaHoy;
  });
  // Filtrar proximos
  const proximos = recordatorios.filter((recordatorio) => {
    const fechaEnDB = new Date(recordatorio[1].fecha);
    const fechaHoy = new Date();
    return compareDates(fechaHoy, fechaEnDB);
  });

  function handleFiltrar() {
    let filteredRecordatorios = [];

    if (homeTipo === "marcados") {
      filteredRecordatorios = marcadas;
    }
    if (homeTipo === "hoy") {
      filteredRecordatorios = hoy;
    }
    if (homeTipo === "proximos") {
      filteredRecordatorios = proximos;
    }

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
          onClick={() => setHomeTipo("recordatorios")}
        />
        <TableroTarjeta
          img={<Flag color="var(--color-red)" />}
          num={marcadas.length}
          text="Marcados"
          date={false}
          color="var(--color)"
          onClick={() => setHomeTipo("marcados")}
        />
        <TableroTarjeta
          img={<Watch color="var(--color-orange)" />}
          num={hoy.length}
          text="Fecha: 26/05/23"
          date={true}
          color="var(--color)"
          onClick={() => setHomeTipo("hoy")}
        />
        <TableroTarjeta
          img={<Calendar color="var(--color-acentado)" />}
          num={proximos.length}
          text="Próx 3 dias"
          date={false}
          color="var(--color)"
          onClick={() => setHomeTipo("proximos")}
        />
      </section>

      <section className="home-lista-container">
        <h2 className="listas-titulos">Mis listas</h2>
        {homeTipo === "listas" && misListas}
        {homeTipo === "recordatorios" && todosLosRecordatorios}
        {(homeTipo === "marcados" || "hoy" || "proximos") && handleFiltrar()}
      </section>
    </main>
  );
}
