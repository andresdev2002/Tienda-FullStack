from pydantic import BaseModel, Field

# =========================
# DETALLE DE PRODUCTOS
# =========================
class DetalleVentaCreate(BaseModel):
    producto_id: int
    
    cantidad: int = Field(
        gt=0,
        description="La cantidad debe ser mayor a 0"
    )

# =========================
# RESPUESTA DETALLE
# =========================
class DetalleVentaResponse(BaseModel):
    id: int
    producto_id: int
    cantidad: int
    precio: float

    class Config:
        from_attributes = True