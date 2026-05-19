# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel

from decimal import Decimal

from typing import Optional


# =========================================
# BASE PRODUCTO
# =========================================

class ProductoBase(BaseModel):

    # Nombre producto
    nombre: str

    # Descripción producto
    descripcion: Optional[str] = None

    # Categoría relacionada
    categoria_id: int

    # Proveedor relacionado
    proveedor_id: int

    # SKU producto
    sku: Optional[str] = None

    # Código barras
    codigo_barras: Optional[str] = None

    # Precio compra
    precio_compra: Decimal

    # Precio venta
    precio_venta: Decimal

    # Stock actual
    stock_actual: int

    # Stock mínimo
    stock_minimo: int

    # Stock máximo
    stock_maximo: int

    # Unidad medida
    unidad_medida: Optional[str] = None

    # Estado producto
    estado: bool = True

    # Imagen producto
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

    # ID producto
    id_producto: int

    class Config:

        # ORM → JSON
        from_attributes = True