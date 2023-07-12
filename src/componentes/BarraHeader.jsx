import { Link } from "react-router-dom";

export default function BarraHeader() {
  return (
    <header className="header-container">
      <Link to="editar-lista">Editar lista</Link>
      <Link className="header-inicio" to="/">
        INICIO
      </Link>
      <Link to="ajustes">Ajustes</Link>
    </header>
  );
}
