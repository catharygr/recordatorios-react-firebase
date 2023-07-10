import { useId } from "react";

export default function Loguear() {
  const id = useId();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="loguear-container">
      <h1>Loguear</h1>
      <form className="loguear-form" onSubmit={handleSubmit}>
        <label htmlFor={`${id}-email`}>Email</label>
        <input type="email" id={`${id}-email`} placeholder="Rellene su email" />
        <label htmlFor={`${id}-password`}>Contraseña</label>
        <input
          type="password"
          id={`${id}-password`}
          placeholder="Rellene su password"
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
