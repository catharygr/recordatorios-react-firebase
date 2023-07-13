import { Link } from "react-router-dom";
import { push } from "firebase/database";
import { ref as refDB } from "firebase/database";
import { db } from "../scripts/firebase";
import { useContext } from "react";
import { MisUidContext } from "../scripts/DataContext";

export default function BarraFooter() {
  const { uidState } = useContext(MisUidContext);

  function handleNuevaLista() {
    push(refDB(db, `/listas/${uidState}`), {
      nombre: "",
      usuarioId: "",
    });
  }

  return (
    <div>
      <footer className="footer-container">
        <Link onClick={handleNuevaLista} to="editar-lista">
          Nueva lista
        </Link>
        <Link to="nuevo-recordatorio">+ Nuevo recordatorio</Link>
      </footer>
    </div>
  );
}
