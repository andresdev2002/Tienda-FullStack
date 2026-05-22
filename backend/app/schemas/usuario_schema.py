# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel
from pydantic import EmailStr

# =========================================
# USUARIO CREATE
# =========================================

class UsuarioCreate(BaseModel):

    nombre: str

    email: EmailStr

    password: str

    rol_id: int

# =========================================
# USUARIO RESPONSE
# =========================================

class UsuarioResponse(BaseModel):

    id_usuario: int

    nombre: str

    email: EmailStr

    estado: bool

    rol_id: int

    class Config:

        from_attributes = True