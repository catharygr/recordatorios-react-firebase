/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { auth } from "../scripts/firebase";
import { signOut } from "firebase/auth";

export default function Ajustes() {
  const navigate = useNavigate();
  function handleSalir() {
    signOut(auth)
      .then(() => navigate("/loguear"))
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="ajustes-container">
      <button>Modo claro</button>
      <button onClick={handleSalir} className="salir-btn">
        Salir
      </button>
    </div>
  );
}
