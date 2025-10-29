import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./components/Layout";
import Productos from "./pages/Productos";
import Clientes from "./pages/Clientes";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/productos" replace />} />
        <Route path="productos" element={<Productos />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="ventas" element={<Clientes />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
