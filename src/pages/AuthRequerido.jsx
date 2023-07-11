/* eslint-disable react-hooks/exhaustive-deps */
import { auth } from "../scripts/firebase";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { MisUidContext } from "../scripts/DataContext";

export default function AuthRequerido() {
  const navigate = useNavigate();
  const [estaLogueado, setEstaLogueado] = useState(false);
  const { setUidState } = useContext(MisUidContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEstaLogueado(true);
        setUidState(user.uid);
      } else {
        setEstaLogueado(false);
        navigate("/loguear");
      }
    });
  }, []);

  if (!estaLogueado) {
    return (
      <p style={{ width: "412px", marginBlock: "auto", color: "red" }}>
        Verificando si el usuario está logueado...
      </p>
    );
  }

  return <Outlet />;
}
