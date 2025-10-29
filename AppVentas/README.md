# 🛒 AppVentas

Sistema web para gestión de productos, reportes y clientes, desarrollado con **React**, **Spring Boot** y **PostgreSQL**, ideal para entornos educativos, comerciales o comunitarios.

---

## 🚀 Tecnologías utilizadas

- ⚛️ Frontend: React + Vite + PrimeReact
- 🔧 Backend: Spring Boot + JPA + Spring Security
- 🐘 Base de datos: PostgreSQL 15
- 🐳 Contenedores: Docker + Docker Compose
- 📊 Reportes: funciones SQL personalizadas

---

## 📁 Estructura del proyecto

```
appventas/
├── backend/           # Código Java con servicios REST
├── frontend/          # Aplicación React con interfaz moderna
├── db/init.sql        # Script de creación de base de datos y funciones
├── docker-compose.yml # Orquestación de servicios
```

---

## 🧰 Requisitos previos

- Docker y Docker Compose instalados
- Puerto `5433` libre para PostgreSQL
- Puerto `8081` libre para backend
- Puerto `5173` libre para frontend

---

## 🐳 Instalación rápida

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/appventas.git
cd appventas

# Levantar los servicios
docker-compose up --build
```

> La base de datos se inicializa automáticamente con `init.sql` la primera vez que se crea el volumen.

---

## 🔐 Credenciales por defecto

- Usuario: `admin`
- Clave: `admin123`

---

## 📊 Endpoints destacados

- `GET /api/productos` → Listado de productos
- `POST /api/productos` → Crear producto
- `PUT /api/productos/{id}` → Modificar producto
- `DELETE /api/productos/{id}` → Eliminar producto
- `GET /api/clientes` → Listado de clientes
- `GET /api/reportes/resumen` → Reporte consolidado (productos top, cliente top, ingresos)

---

## ❤️ Autor

Desarrollado por [Carlos Dubón Cornejo](https://github.com/tu-usuario), líder educativo y mentor técnico, con enfoque en formación comunitaria, ética digital y soluciones replicables.

---

