-- Tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    rol_id INTEGER NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- Tabla de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(20),
    direccion TEXT
);

-- Tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0)
);

-- Tabla de ventas
CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cliente_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- Tabla de detalle de ventas
CREATE TABLE detalle_venta (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario >= 0),
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    FOREIGN KEY (venta_id) REFERENCES ventas(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- Tabla de detalle de ventas
CREATE TABLE detalle_venta (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario >= 0),
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    FOREIGN KEY (venta_id) REFERENCES ventas(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


CREATE OR REPLACE FUNCTION obtener_top_3_productos()
RETURNS TABLE (
    producto_id INT,
    nombre TEXT,
    total_vendido INT
)
LANGUAGE sql
AS $$
    SELECT p.id, p.nombre, SUM(dv.cantidad) AS total_vendido
    FROM detalle_venta dv
    JOIN productos p ON p.id = dv.producto_id
    GROUP BY p.id, p.nombre
    ORDER BY total_vendido DESC
    LIMIT 3;
$$;

CREATE OR REPLACE FUNCTION cliente_top_ingresos()
RETURNS TABLE (
    cliente_id INT,
    nombre TEXT,
    total_ingresos DECIMAL(10,2)
)
LANGUAGE sql
AS $$
    SELECT c.id, c.nombre, SUM(v.total) AS total_ingresos
    FROM ventas v
    JOIN clientes c ON c.id = v.cliente_id
    GROUP BY c.id, c.nombre
    ORDER BY total_ingresos DESC
    LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION ingreso_total_ultimo_mes()
RETURNS DECIMAL(10,2)
LANGUAGE sql
AS $$
    SELECT COALESCE(SUM(total), 0)
    FROM ventas
    WHERE fecha >= CURRENT_DATE - INTERVAL '30 days';
$$;

select * from ingreso_total_ultimo_mes();