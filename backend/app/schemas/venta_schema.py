from pydantic import BaseModel
from datetime import datetime
from typing import List

from app.schemas.detalle_venta_schema import (
    DetalleVentaCreate,
    DetalleVentaResponse
)

# =========================
# CREAR VENTA
# =========================
class VentaCreate(BaseModel):
    productos: List[DetalleVentaCreate]

# =========================
# RESPUESTA VENTA
# =========================
class VentaResponse(BaseModel):
    id: int
    fecha: datetime
    detalles: List[DetalleVentaResponse]

    class Config:
        from_attributes = True