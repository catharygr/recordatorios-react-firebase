import { Link } from "react-router-dom";
import { Settings, Home, List } from "react-feather";

export default function BarraHeader() {
  return (
    <header className="header-container">
      <Link to="editar-lista">
        <List size={18} />
      </Link>
      <Link className="header-inicio" to="/">
        <Home size={22} color="var(--color-green)" />
      </Link>
      <Link className="header-ajustes" to="ajustes">
        <Settings size={18} />
      </Link>
    </header>
  );
}
