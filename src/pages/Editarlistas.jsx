import EditarListainput from "../componentes/EditarListaInput";

/* eslint-disable react/prop-types */
export default function EditarListas() {
  return (
    <div className="editarlistas-container">
      <h2 className="listas-titulos">Mis listas</h2>
      <div className="editarlista-input">
        <EditarListainput />
        <EditarListainput />
        <EditarListainput />
        <EditarListainput />
      </div>
    </div>
  );
}
