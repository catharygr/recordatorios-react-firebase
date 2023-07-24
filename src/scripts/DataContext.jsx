/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState, useContext } from "react";
import { onValue, ref as refDB } from "firebase/database";
import { db } from "./firebase";

export const MisListaContext = createContext();
export const MisRecordatioContext = createContext();
export const MisUidContext = createContext();
export const MisTipoHomeContext = createContext();
export const MiColorUIContext = createContext();

export function ListaContext({ children }) {
  const { uidState } = useContext(MisUidContext);
  const [listState, setListState] = useState([]);

  // Contexto de lista
  useEffect(() => {
    const cancelOnValue = onValue(
      refDB(db, `/listas/${uidState}`),
      function (snapshot) {
        if (snapshot.val()) {
          setListState(Object.entries(snapshot.val()));
        } else {
          setListState([]);
        }
      }
    );
    return cancelOnValue;
  }, []);

  return (
    <MisListaContext.Provider value={listState}>
      {children}
    </MisListaContext.Provider>
  );
}

// Contexto de recordatorio

export function RecordatorioContext({ children }) {
  const [recordatorioState, setRecordatorioState] = useState([]);
  const { uidState } = useContext(MisUidContext);

  useEffect(() => {
    const cancelOnValue = onValue(
      refDB(db, `/recordatorios/${uidState}`),
      function (snapshot) {
        if (snapshot.val()) {
          setRecordatorioState(Object.entries(snapshot.val()));
        } else {
          setRecordatorioState([]);
        }
      }
    );
    return cancelOnValue;
  }, []);

  return (
    <MisRecordatioContext.Provider value={recordatorioState}>
      {children}
    </MisRecordatioContext.Provider>
  );
}

// Contexto de uid del usuario

export function UidContext({ children }) {
  const [uidState, setUidState] = useState("");

  const value = React.useMemo(
    () => ({ uidState, setUidState }),
    [uidState, setUidState]
  );

  return (
    <MisUidContext.Provider value={value}>{children}</MisUidContext.Provider>
  );
}

// Contexto de tipo de lista en home
export function TipoHomeContext({ children }) {
  // listas, recordatorios, marcados, hoy, proximos
  const [homeTipo, setHomeTipo] = useState("listas");

  const value = React.useMemo(
    () => ({ homeTipo, setHomeTipo }),
    [homeTipo, setHomeTipo]
  );

  return (
    <MisTipoHomeContext.Provider value={value}>
      {children}
    </MisTipoHomeContext.Provider>
  );
}

// Contexto de color de UI
export function ColorUIContext({ children }) {
  const [colorUI, setColorUI] = useState("var(--color--oscuro)");

  const value = React.useMemo(
    () => ({ colorUI, setColorUI }),
    [colorUI, setColorUI]
  );

  return (
    <MiColorUIContext.Provider value={value}>
      {children}
    </MiColorUIContext.Provider>
  );
}
