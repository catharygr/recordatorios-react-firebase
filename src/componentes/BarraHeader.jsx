import { Link } from "react-router-dom";
import { Settings, Home, List } from "react-feather";
import { MisTipoHomeContext } from "../scripts/DataContext";
import { useContext } from "react";

export default function BarraHeader() {
  const { setHomeTipo } = useContext(MisTipoHomeContext);
  return (
    <header className="header-container">
      <Link to="editar-lista">
        <List size={18} />
      </Link>
      <Link
        onClick={() => setHomeTipo("listas")}
        className="header-inicio"
        to="/"
      >
        <Home size={22} color="var(--color-green)" />
      </Link>
      <Link className="header-ajustes" to="ajustes">
        <Settings size={18} />
      </Link>
    </header>
  );
}
