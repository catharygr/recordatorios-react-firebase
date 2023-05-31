export default function TarjetaRecordatorio() {
  return (
    <div className="tarjeta-recordatorio-container">
      <button className="cancelar-delete-btn"></button>
      <input className="tarjeta-recordatorio-input" type="text" />
      <img
        className="tarjeta-recordatorio-img"
        src="/assets/bandera.png"
        alt=""
      />
    </div>
  );
}
