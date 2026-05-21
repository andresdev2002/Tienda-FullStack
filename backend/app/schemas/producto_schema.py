from pydantic import BaseModel
from decimal import Decimal
from typing import Optional
from enum import Enum


# =========================================
# ENUM ESTADO
# =========================================

class EstadoProducto(str, Enum):
    ACTIVO = "ACTIVO"
    INACTIVO = "INACTIVO"


# =========================================
# BASE PRODUCTO
# =========================================

class ProductoBase(BaseModel):

    nombre: str
    descripcion: Optional[str] = None
    categoria_id: int
    proveedor_id: int
    sku: Optional[str] = None
    codigo_barras: Optional[str] = None
    precio_compra: Decimal
    precio_venta: Decimal
    stock_actual: int
    stock_minimo: int
    stock_maximo: int
    unidad_medida: Optional[str] = None

    # ← Cambiado de bool a EstadoProducto
    estado: EstadoProducto = EstadoProducto.ACTIVO

    imagen_url: Optional[str] = None


# =========================================
# CREAR PRODUCTO
# =========================================

class ProductoCreate(ProductoBase):
    pass


# =========================================
# RESPUESTA PRODUCTO
# =========================================

class ProductoResponse(ProductoBase):

    id_producto: int

    class Config:
        from_attributes = True