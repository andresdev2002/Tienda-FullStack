# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel

from typing import Optional

from datetime import datetime


# =========================================
# BASE MOVIMIENTO INVENTARIO
# =========================================

class MovimientoInventarioBase(BaseModel):

    # Producto relacionado
    producto_id: int

    # Usuario responsable
    usuario_id: int

    # Tipo movimiento
    tipo_movimiento: str

    # Cantidad movimiento
    cantidad: int

    # Observación
    observacion: Optional[str] = None


# =========================================
# CREAR MOVIMIENTO
# =========================================

class MovimientoInventarioCreate(
    MovimientoInventarioBase
):

    pass


# =========================================
# RESPUESTA MOVIMIENTO
# =========================================

class MovimientoInventarioResponse(
    MovimientoInventarioBase
):

    # ID movimiento
    id_movimiento: int

    # Fecha movimiento
    fecha_movimiento: datetime

    class Config:

        # ORM → JSON
        from_attributes = True