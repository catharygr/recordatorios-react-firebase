import { useId } from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";

export default function Loguear() {
  const id = useId();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
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

  return (
    <div className="loguear-container">
      <h1>Loguear</h1>
      <form className="loguear-form" onSubmit={handleSubmit}>
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          type="email"
          id={`${id}-email`}
          placeholder="Rellene su email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label htmlFor={`${id}-password`}>Contraseña</label>
        <input
          type="password"
          id={`${id}-password`}
          placeholder="Rellene su password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Ingresar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
