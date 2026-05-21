# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel

from typing import Optional


# =========================================
# BASE PROVEEDOR
# =========================================

class ProveedorBase(BaseModel):

    # Nombre proveedor
    nombre: str

    # Contacto proveedor
    contacto: Optional[str] = None

    # Teléfono proveedor
    telefono: Optional[str] = None

    # Email proveedor
    email: Optional[str] = None


# =========================================
# CREAR PROVEEDOR
# =========================================

class ProveedorCreate(ProveedorBase):

    pass


# =========================================
# RESPUESTA PROVEEDOR
# =========================================

class ProveedorResponse(ProveedorBase):

    # ID proveedor
    id_proveedor: int

    class Config:

        # ORM → JSON
        from_attributes = True