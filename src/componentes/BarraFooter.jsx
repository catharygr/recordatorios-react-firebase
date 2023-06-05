import { Link } from "react-router-dom";
import { listasEnDB } from "../scripts/firebase";
import { push } from "firebase/database";

export default function BarraFooter() {
  function handleNuevaLista() {
    push(listasEnDB, {
      nombre: "Nueva lista",
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
