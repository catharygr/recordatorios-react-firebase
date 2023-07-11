/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { auth } from "../scripts/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function Ajustes() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleSalir() {
    signOut(auth)
      .then(() => navigate("/loguear"))
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="ajustes-container">
      <button>Modo claro</button>
      <button onClick={handleSalir} className="salir-btn">
        Salir
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
