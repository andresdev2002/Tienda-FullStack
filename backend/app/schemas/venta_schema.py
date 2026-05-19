# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel

from datetime import datetime

from typing import List

# =========================================
# SCHEMAS
# =========================================

from app.schemas.detalle_venta_schema import (
    DetalleVentaCreate,
    DetalleVentaResponse
)

# =========================================
# CREAR VENTA
# =========================================

class VentaCreate(BaseModel):

    # Cliente relacionado
    cliente_id: int

    # Usuario responsable
    usuario_id: int

    # Productos vendidos
    detalles: List[DetalleVentaCreate]

# =========================================
# RESPUESTA VENTA
# =========================================

class VentaResponse(BaseModel):

    # ID venta
    id_venta: int

    # Cliente relacionado
    cliente_id: int

    # Usuario responsable
    usuario_id: int

    # Total venta
    total: float

    # Fecha venta
    fecha_venta: datetime

    # Detalles venta
    detalles: List[DetalleVentaResponse]

    class Config:

        # ORM → JSON
        from_attributes = True