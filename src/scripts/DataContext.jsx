/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";
import { onValue, ref as refDB } from "firebase/database";
import { recordatorioEnDB, db } from "./firebase";

export const MisListaContext = createContext();
export const MisRecordatioContext = createContext();
export const MisUidContext = createContext();

export function ListaContext({ children }) {
  const { uidState } = useContext(MisUidContext);
  const [listState, setListState] = useState([]);

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

  // Contexto de lista
  return (
    <MisListaContext.Provider value={listState}>
      {children}
    </MisListaContext.Provider>
  );
}

// Contexto de recordatorio

export function RecordatorioContext({ children }) {
  const [recordatorioState, setRecordatorioState] = useState([]);

  useEffect(() => {
    const cancelOnValue = onValue(recordatorioEnDB, function (snapshot) {
      if (snapshot.val()) {
        setRecordatorioState(Object.entries(snapshot.val()));
      } else {
        setRecordatorioState([]);
      }
    });
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

  return (
    <MisUidContext.Provider value={{ uidState, setUidState }}>
      {children}
    </MisUidContext.Provider>
  );
}
