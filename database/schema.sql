-- =========================================
-- CREAR BASE DE DATOS
-- =========================================

CREATE DATABASE tienda_inventario_pro;

USE tienda_inventario_pro;


-- =========================================
-- TABLA ROLES
-- =========================================

CREATE TABLE roles (

    id_rol INT PRIMARY KEY AUTO_INCREMENT,

    nombre VARCHAR(50) NOT NULL
);


-- =========================================
-- TABLA USUARIOS
-- =========================================

CREATE TABLE usuarios (

    id_usuario INT PRIMARY KEY AUTO_INCREMENT,

    username VARCHAR(50) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    rol_id INT,

    FOREIGN KEY (rol_id)
        REFERENCES roles(id_rol)
);


-- =========================================
-- TABLA CATEGORIAS
-- =========================================

CREATE TABLE categorias (

    id_categoria INT PRIMARY KEY AUTO_INCREMENT,

    nombre VARCHAR(100) NOT NULL
);


-- =========================================
-- TABLA PROVEEDORES
-- =========================================

CREATE TABLE proveedores (

    id_proveedor INT PRIMARY KEY AUTO_INCREMENT,

    nombre VARCHAR(100) NOT NULL,

    contacto VARCHAR(100),

    telefono VARCHAR(50),

    email VARCHAR(100)
);


-- =========================================
-- TABLA PRODUCTOS
-- =========================================

CREATE TABLE productos (

    id_producto INT PRIMARY KEY AUTO_INCREMENT,

    nombre VARCHAR(100) NOT NULL,

    descripcion TEXT,

    categoria_id INT,

    proveedor_id INT,

    sku VARCHAR(50) UNIQUE,

    codigo_barras VARCHAR(100),

    precio_compra DECIMAL(10,2),

    precio_venta DECIMAL(10,2),

    stock_actual INT DEFAULT 0,

    stock_minimo INT DEFAULT 0,

    stock_maximo INT DEFAULT 0,

    unidad_medida VARCHAR(20),

    estado VARCHAR(20) DEFAULT 'ACTIVO',

    imagen_url VARCHAR(255),

    fecha_creacion TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (categoria_id)
        REFERENCES categorias(id_categoria),

    FOREIGN KEY (proveedor_id)
        REFERENCES proveedores(id_proveedor)
);


-- =========================================
-- TABLA CLIENTES
-- =========================================

CREATE TABLE clientes (

    id_cliente INT PRIMARY KEY AUTO_INCREMENT,

    nombre VARCHAR(100),

    telefono VARCHAR(50),

    email VARCHAR(100)
);


-- =========================================
-- TABLA VENTAS
-- =========================================

CREATE TABLE ventas (

    id_venta INT PRIMARY KEY AUTO_INCREMENT,

    usuario_id INT,

    cliente_id INT,

    metodo_pago ENUM(
        'EFECTIVO',
        'TARJETA',
        'TRANSFERENCIA',
        'NEQUI'
    ),

    fecha_venta TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    total DECIMAL(10,2),

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id_usuario),

    FOREIGN KEY (cliente_id)
        REFERENCES clientes(id_cliente)
);


-- =========================================
-- TABLA DETALLE VENTAS
-- =========================================

CREATE TABLE detalle_ventas (

    id_detalle INT PRIMARY KEY AUTO_INCREMENT,

    venta_id INT,

    producto_id INT,

    cantidad INT,

    precio_unitario DECIMAL(10,2),

    subtotal DECIMAL(10,2),

    FOREIGN KEY (venta_id)
        REFERENCES ventas(id_venta),

    FOREIGN KEY (producto_id)
        REFERENCES productos(id_producto)
);


-- =========================================
-- TABLA MOVIMIENTOS INVENTARIO
-- =========================================

CREATE TABLE movimientos_inventario (

    id_movimiento INT PRIMARY KEY AUTO_INCREMENT,

    producto_id INT,

    usuario_id INT,

    tipo_movimiento ENUM(
        'ENTRADA',
        'SALIDA',
        'AJUSTE',
        'DEVOLUCION'
    ),

    cantidad INT,

    observacion TEXT,

    fecha_movimiento TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (producto_id)
        REFERENCES productos(id_producto),

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id_usuario)
);


-- =========================================
-- ÍNDICES
-- =========================================

CREATE INDEX idx_producto_nombre
ON productos(nombre);

CREATE INDEX idx_codigo_barras
ON productos(codigo_barras);

CREATE INDEX idx_fecha_venta
ON ventas(fecha_venta);

CREATE INDEX idx_detalle_producto
ON detalle_ventas(producto_id);

CREATE INDEX idx_movimiento_producto
ON movimientos_inventario(producto_id);

CREATE INDEX idx_fecha_movimiento
ON movimientos_inventario(fecha_movimiento);