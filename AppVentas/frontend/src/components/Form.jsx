import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Producto guardado: ${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-fluid p-formgrid p-grid p-4"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="p-field p-col-12">
          <label htmlFor="nombre">Nombre del producto</label>
          <InputText
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Laptop"
          />
        </div>

        <div className="p-field p-col-12">
          <label htmlFor="precio">Precio</label>
          <InputText
            id="precio"
            name="precio"
            type="number"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Ej. 1200"
          />
        </div>

        <div className="p-field p-col-12">
          <label htmlFor="categoria">Categoría</label>
          <InputText
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Seleccione una categoría"
          />
        </div>

        <div className="p-field p-col-12 text-center">
          <Button label="Guardar" icon="pi pi-check" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Form;
