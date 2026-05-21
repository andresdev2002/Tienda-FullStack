# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel

# =========================================
# CREAR DETALLE VENTA
# =========================================

class DetalleVentaCreate(BaseModel):

    # Producto relacionado
    producto_id: int

    # Cantidad vendida
    cantidad: int

# =========================================
# RESPUESTA DETALLE VENTA
# =========================================

class DetalleVentaResponse(BaseModel):

    # ID detalle
    id_detalle: int

    # Producto relacionado
    producto_id: int

    # Cantidad vendida
    cantidad: int

    # Precio unitario
    precio_unitario: float

    # Subtotal
    subtotal: float

    class Config:

        # ORM → JSON
        from_attributes = True