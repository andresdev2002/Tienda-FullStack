# =========================================
# PYDANTIC
# =========================================

from pydantic import BaseModel


# =========================================
# BASE CATEGORIA
# =========================================

class CategoriaBase(BaseModel):

    # Nombre categoría
    nombre: str


# =========================================
# CREAR CATEGORIA
# =========================================

class CategoriaCreate(CategoriaBase):

    pass


# =========================================
# RESPUESTA CATEGORIA
# =========================================

class CategoriaResponse(CategoriaBase):

    # ID categoría
    id_categoria: int

    class Config:

        # ORM → JSON
        from_attributes = True