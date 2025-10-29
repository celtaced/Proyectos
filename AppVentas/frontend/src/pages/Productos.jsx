import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { mockProductos } from "../api/productos";

const API_URL = "http://192.168.10.100:8081/api/productos";

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [error, setError] = useState(null);

  const openEditDialog = (product) => {
    console.log(product);
    alert(
      `Acaba de seleccionar el producto: ${
        product.nombre || product.name || product.id
      }`
    );
  };

  const newProduct = () => {
    console.log("abrira un form");
  };

  const closeEditDialog = () => {};

  const handleDelete = (product) => {
    let isdeleted = confirm(
      `Esta seguro de eliminar el producto: ${product.id}`
    );

    if (isdeleted) {
      console.log(`se borró el producto ${product.nombre}`);
      console.log(product);
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="p-d-flex p-jc-end">
        <Button
          icon="pi pi-pencil" // Icono para editar
          className="p-button-rounded p-button-success p-mr-1"
          onClick={() => openEditDialog(rowData)}
          tooltip="Ver Detalles / Editar"
        />
        <Button
          icon="pi pi-trash" // Icono para eliminar
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData)}
          tooltip="Eliminar Producto"
        />
      </div>
    );
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
      const username = "admin";
      const password = "admin123";
      const token = btoa(`${username}:${password}`);

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      setProducts(response.data);
      setLoading(false);
    } catch (err) {
        console.error("Error al obtener la lista de productos:", err);
        setError(
          "Error al cargar los datos. Verifique que el backend esté corriendo."
        );
      }
    };

    getProducts();
  }, []);

  const header = (
    <div className="p-d-flex p-jc-between p-ai-center u-margin-bottom-small u-margin-top-small u-bg-white">
      <h2 className="p-m-0">Productos</h2>
      <Button
        label="Nuevo producto"
        className="p-button-outlined p-button-info p-mr-1 p-2 mt-2"
        style={{ borderRadius: "6px" }}
        onClick={() => newProduct()}
      />
    </div>
  );

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
    <Card className="p-shadow-1 p-p-5 u-margin-top-medium u-padding-side-small">
      <DataTable
        value={products}
        header={header}
        dataKey="id"
        loading={loading}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        filterDisplay="row"
        className="tabla-full-width"
        emptyMessage="No se han registrado productos."
      >
        <Column field="id" header="ID" sortable className="text-center" />
        <Column
          field="nombre"
          header="Nombre"
          sortable
          filter
          filterPlaceholder="filtrar por producto"
        />
        <Column
          field="descripcion"
          header="Descripción"
          sortable
          filter
          filterPlaceholder="Buscar por descripcion del producto"
        />
        <Column
          field="precio"
          header="Precio Unitario"
          sortable
          filter
          filterPlaceholder="filtrar por precio"
          className="text-center"
        />
        <Column
          field="stock"
          header="Stock"
          sortable
          filter
          filterPlaceholder="filtrar por cantidad"
          className="text-center"
        />
        <Column
          header="Acciones"
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "10rem" }}
          className="text-center"
        />
      </DataTable>
    </Card>
  );
}

export default Productos;
