import { NavLink, useNavigate } from "react-router-dom"; // Usaremos NavLink
import { Button } from "primereact/button";

function NavBar() {
  const navigate = useNavigate();

  // Define los enlaces y sus rutas
  const items = [
    { label: "Productos", path: "/productos" },
    { label: "Clientes", path: "/clientes" },
    { label: "Ventas", path: "/ventas" },
  ];
  return (
    <nav className="p-d-flex p-ai-center p-jc-between p-p-3 p-shadow-2 menu_container">
      <ul className="p-d-flex p-list-none p-m-0 p-p-0 menu">
        {items.map((link) => (
          <li key={link.path} className="p-mx-2">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `nav-link p-px-2 p-py-1 ${isActive ? "nav-link-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <Button
        label="CERRAR SESION"
        className="p-button-warning p-2"
        onClick={() => navigate("/login")}
      />
    </nav>
  );
}

export default NavBar;
