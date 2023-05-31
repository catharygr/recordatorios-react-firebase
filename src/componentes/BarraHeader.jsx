import { Link } from "react-router-dom";

export default function BarraHeader() {
  return (
    <header className="header-container">
      <Link to="editar-lista">Editar lista</Link>
      <Link to="/">Inicio</Link>
      <Link to="ajustes">Ajustes</Link>
    </header>
  );
}
