import { useEffect, useState } from "react";
import axios from "axios";
import DataVentas from "./DataVentas";
import { Card } from "primereact/card";

const API_URL = "http://192.168.10.100:8081/api/reportes/resumen";

function Dashboard() {
  const [ventaData, setVentaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDataVentas = async () => {
      try {
        const username = "admin";
        const password = "admin123";
        const token = btoa(`${username}:${password}`);
  
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
  
        setVentaData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener la informacion de ventas:", err);
        setError(
          "Error al cargar los datos. Verifique que el backend esté corriendo o que las credenciales sean correctas."
        );
      }
    };

    getDataVentas();
  }, []);

  if (error) {
    return (
      <Card
        title="Error de Conexión"
        className="p-shadow-3 p-card-danger p-p-4 p-text-center container"
      >
        {error}
      </Card>
    );
  }

  return (
    <div>
      {ventaData.length > 0 ? (
        ventaData.map((item, index) => <DataVentas item={item} key={index} />)
      ) : (
        <p>Cargando datos de ventas...</p>
      )}
    </div>
  );
}

export default Dashboard;
