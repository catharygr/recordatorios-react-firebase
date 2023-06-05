/* eslint-disable react/prop-types */
export default function TarjetaRecordatorio({ data, id }) {
  return (
    <div className="tarjeta-recordatorio-container">
      <button className="cancelar-delete-btn"></button>
      <input
        className="tarjeta-recordatorio-input"
        type="text"
        value={data.titulo}
      />
      {data.marcado && (
        <img
          className="tarjeta-recordatorio-img"
          src="/assets/bandera.png"
          alt=""
        />
      )}
    </div>
  );
}
