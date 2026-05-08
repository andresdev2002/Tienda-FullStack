from pydantic import BaseModel
from datetime import datetime

# =========================
# CREAR USUARIO
# =========================
class UsuarioCreate(BaseModel):
    username: str
    password: str

# =========================
# RESPUESTA USUARIO
# =========================
class UsuarioResponse(BaseModel):
    id: int
    username: str
    creado_en: datetime

    class Config:
        from_attributes = True