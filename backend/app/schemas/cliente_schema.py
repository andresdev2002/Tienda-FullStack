# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel

from typing import Optional


# =========================================
# BASE CLIENTE
# =========================================

class ClienteBase(BaseModel):

    # Nombre cliente
    nombre: str

    # Teléfono cliente
    telefono: Optional[str] = None

    # Email cliente
    email: Optional[str] = None


# =========================================
# CREAR CLIENTE
# =========================================

class ClienteCreate(ClienteBase):

    pass


# =========================================
# RESPUESTA CLIENTE
# =========================================

class ClienteResponse(ClienteBase):

    # ID cliente
    id_cliente: int

    class Config:

        # ORM → JSON
        from_attributes = True