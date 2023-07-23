/* eslint-disable react/prop-types */
export default function TableroTarjeta({
  onClick,
  img,
  num,
  text,
  date,
  color,
}) {
  const fecha = new Date();
  return (
    <div onClick={onClick} className="tablero-tarjeta">
      <div className="tablero-tarjeta--primera-fila">
        {img}
        <p style={{ color: `${color}` }} className="tablero-tarjeta--num">
          {num}
        </p>
      </div>
      <p className="tablero-tarjeta--fecha">
        {date ? `Fecha: ${fecha.toLocaleDateString()}` : text}
      </p>
    </div>
  );
}
