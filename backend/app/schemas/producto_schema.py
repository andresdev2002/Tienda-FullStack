from pydantic import BaseModel
from datetime import datetime

# =========================
# CREAR PRODUCTO
# =========================
class ProductoCreate(BaseModel):
    nombre: str
    precio: float
    stock: int

# =========================
# ACTUALIZAR PRODUCTO
# =========================
class ProductoUpdate(BaseModel):
    nombre: str
    precio: float
    stock: int

# =========================
# RESPUESTA PRODUCTO
# =========================
class ProductoResponse(BaseModel):
    id: int
    nombre: str
    precio: float
    stock: int
    creado_en: datetime

    class Config:
        from_attributes = True