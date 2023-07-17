import { useState, useRef, useId } from "react";
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
  const [repetirPasswordForm, setRepetirPasswordForm] = useState("");
  const [repetirPasswordString, setRepetirPasswordString] = useState("");

  const navigate = useNavigate();
  const btnRef = useRef();

  // Función para chequear que las contraseñas coinciden
  function handleRepetirPassword(e) {
    const chequearPassword = e.target.value;

    if (chequearPassword !== form.password) {
      btnRef.current.disabled = true;
      setRepetirPasswordString("No coinciden");
      setBtnDesabilitado(true);
    } else if (chequearPassword === form.password) {
      btnRef.current.disabled = false;
      setRepetirPasswordString("Coinciden");
      setBtnDesabilitado(false);
    }

    setRepetirPasswordForm(chequearPassword);
  }

  // Función para limpiar el formulario
  function limpirarForm() {
    setForm({
      email: "",
      password: "",
    });
    setRepetirPasswordForm("");
    setRepetirPasswordString("");
  }

  // Función para cambiar entre loguear y registrar
  function handleRegistrar() {
    setEstaRegistrado(!estaRegistrado);
    limpirarForm();
  }

  // Función para loguear o registrar
  function handleSubmit(e) {
    e.preventDefault();
    btnRef.current.disabled = true;

    if (!estaRegistrado) {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(() => navigate("/"))
        .catch((error) => {
          btnRef.current.disabled = false;
          setBtnDesabilitado(false);
          limpirarForm();
          setError(error.message);
        });
      return;
    }

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => navigate("/"))
      .catch((error) => {
        btnRef.current.disabled = false;
        setBtnDesabilitado(false);
        limpirarForm();
        setError(error.message);
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
        {!estaRegistrado && (
          <>
            <label htmlFor={`${id}-repetirPassword`}>
              Repetir contraseña:{" "}
              {
                <span style={{ color: "var(--color)" }}>
                  {repetirPasswordString}
                </span>
              }
            </label>
            <input
              required={true}
              value={repetirPasswordForm}
              type="password"
              id={`${id}-repetirPassword`}
              placeholder="Rellene su password"
              minLength={8}
              onChange={handleRepetirPassword}
            />
          </>
        )}

        <button disabled={btnDesabilitado} ref={btnRef}>
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
