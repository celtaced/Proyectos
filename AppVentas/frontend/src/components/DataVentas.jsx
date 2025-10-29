import { Card } from "primereact/card";

function DataVentas({ item }) {
  if (!item) return null; // seguridad básica

  const { topProductos = [], clienteTop = {}, ingresoUltimoMes = 0 } = item;

  return (
    <div className="p-d-flex">
      <h2>Resumen de Ventas</h2>

      {/* Productos más vendidos */}
      <div className="p-3 m-2 shadow-2 border-round ">
        <h3>Top productos</h3>
        <ul className=" menu">
          {topProductos.map((prod, index) => (
            <li key={index}>
              <span>{prod.productoNombre}</span>
              <span>vendidos: {prod.totalVendido}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ingreso del último mes */}
      <div className="card p-3 m-2 shadow-2 border-round">
        <h3>Ingreso último mes</h3>
        <span>${ingresoUltimoMes.toFixed(2)}</span>
      </div>

      {/* Cliente principal */}
      <div className="card p-3 m-2 shadow-2 border-round">
        <h3>Cliente top</h3>
        <span>ID: {clienteTop?.clienteId}</span>
        <p>{clienteTop?.clienteNombre}</p>
      </div>
    </div>
  );
}

export default DataVentas;