/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { auth } from "../scripts/firebase";
import { signOut } from "firebase/auth";
import { useState, useContext } from "react";
import { LogOut } from "react-feather";
import { MiColorUIContext } from "../scripts/DataContext";

export default function Ajustes() {
  const [error, setError] = useState("");
  const { colorUI, setColorUI } = useContext(MiColorUIContext);

  const navigate = useNavigate();
  function handleSalir() {
    signOut(auth)
      .then(() => navigate("/loguear"))
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleColorUI() {
    if (colorUI === "claro") {
      setColorUI("oscuro");
    } else {
      setColorUI("claro");
    }
  }

  return (
    <div className="ajustes-container">
      <button onClick={handleColorUI}>
        {colorUI === "oscuro" ? "Modo claro" : "Modo oscuro"}
      </button>
      <button onClick={handleSalir} className="salir-btn">
        <span className="salin-span">
          {" "}
          Salir <LogOut size={16} />
        </span>
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
