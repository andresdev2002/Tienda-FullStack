# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel


# =========================================
# BASE ROL
# =========================================

class RolBase(BaseModel):

    # Nombre del rol
    nombre: str


# =========================================
# CREAR ROL
# =========================================

class RolCreate(RolBase):

    pass


# =========================================
# RESPUESTA ROL
# =========================================

class RolResponse(RolBase):

    # ID rol
    id_rol: int

    class Config:

        # Convierte ORM → JSON
        from_attributes = True