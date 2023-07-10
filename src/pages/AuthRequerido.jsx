/* eslint-disable react-hooks/exhaustive-deps */
import { auth } from "../scripts/firebase";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function AuthRequerido() {
  const navigate = useNavigate();
  const [estaLogueado, setEstaLogueado] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEstaLogueado(true);
      } else {
        setEstaLogueado(false);
        navigate("/loguear");
      }
    });
  }, []);

  if (!estaLogueado) {
    return <h1>Cargando...</h1>;
  }

  return <Outlet />;
}
