import { Link } from "react-router-dom";

export default function BarraFooter() {
  return (
    <div>
      <footer className="footer-container">
        <Link to="nuevo-recordatorio">+ Nuevo recordatorio</Link>
      </footer>
    </div>
  );
}
