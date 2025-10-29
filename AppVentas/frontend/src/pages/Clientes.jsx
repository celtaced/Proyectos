import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { mockClients } from "../api/clientes";

const API_URL = "http://192.168.10.100:8081/api/clientes";

function Clientes() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const getClients = async () => {
    try {
      const username = "admin";
      const password = "admin123";
      const token = btoa(`${username}:${password}`);

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      setClients(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener la lista de clientes:", err);
      setError(
        "Error al cargar los datos. Verifique que el backend esté corriendo o que las credenciales sean correctas."
      );
    }
  };

  getClients();
}, []);

  const header = (
    <div className="p-d-flex p-jc-between p-ai-center u-margin-bottom-small u-margin-top-small u-bg-white">
      <h2 className="p-m-0">Listado de Clientes</h2>
    </div>
  );

  if (error) {
    return (
      <Card
        title="Error de Conexión"
        className="p-shadow-1 p-p-5 u-margin-top-medium u-padding-side-small"
      >
        {error}
      </Card>
    );
  }

  return (
    <Card className="p-shadow-1 p-p-5 u-margin-top-medium u-padding-side-small">
      <DataTable
        value={clients}
        header={header}
        dataKey="id"
        loading={loading}
        // === Puntos de Evaluación ===
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        filterDisplay="row" // Habilita los filtros en cada columna
        // ============================

        className="tabla-full-width"
        emptyMessage="No se encontraron clientes."
      >
        <Column field="id" header="ID" sortable className="text-center" />
        <Column
          field="nombre"
          header="Nombre"
          sortable
          filter
          filterPlaceholder="Buscar por nombre"
        />
        <Column
          field="correo"
          header="Correo"
          sortable
          filter
          filterPlaceholder="Buscar por correo"
        />
        <Column field="telefono" header="Teléfono" />
        <Column field="direccion" header="Dirección" />
      </DataTable>
    </Card>
  );
}

export default Clientes;
