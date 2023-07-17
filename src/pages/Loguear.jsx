import { useId } from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";

export default function Loguear() {
  const id = useId();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [btnDesabilitado, setBtnDesabilitado] = useState(true);
  const [estaRegistrado, setEstaRegistrado] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRegistrar() {
    setEstaRegistrado(!estaRegistrado);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!estaRegistrado) {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(() => navigate("/"))
        .catch((error) => {
          setError(error.message);
        });
      return;
    }

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => navigate("/"))
      .catch((error) => {
        setError(error.message);
      });

    setForm({
      email: "",
      password: "",
    });
  }

  if (form.email && form.password && btnDesabilitado) setBtnDesabilitado(false);
  else if ((!form.email || !form.password) && !btnDesabilitado)
    setBtnDesabilitado(true);

  return (
    <div className="loguear-container">
      <h1>{estaRegistrado ? "Loguear" : "Regístrate"}</h1>
      <form className="loguear-form" onSubmit={handleSubmit}>
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          required={true}
          type="email"
          id={`${id}-email`}
          placeholder="Rellene su email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label htmlFor={`${id}-password`}>Contraseña</label>
        <input
          required={true}
          type="password"
          id={`${id}-password`}
          placeholder="Rellene su password"
          minLength={8}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button disabled={btnDesabilitado} type="submit">
          {estaRegistrado ? "Loguear" : "Regístrate"}
        </button>
        <p onClick={handleRegistrar} className="registar-enlace">
          {estaRegistrado
            ? "Si no tienes cuenta, regístrate..."
            : "Ya tienes cuenta, loguea..."}
        </p>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
