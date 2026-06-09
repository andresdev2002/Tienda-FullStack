# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel

# =========================================
# TYPING
# =========================================

from typing import List


# =========================================
# DETALLE VENTA
# =========================================

class DetalleVentaCreate(BaseModel):

    producto_id: int

    cantidad: int


# =========================================
# VENTA
# =========================================

class VentaCreate(BaseModel):


    cliente_id: int

    metodo_pago: str

    detalles: List[DetalleVentaCreate]