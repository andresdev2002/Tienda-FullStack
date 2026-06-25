# =========================================
# FASTAPI
# =========================================

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

# =========================================
# SQLALCHEMY
# =========================================

from sqlalchemy.orm import Session

# =========================================
# DATABASE
# =========================================

from app.database import SessionLocal

# =========================================
# MODELOS
# =========================================

from app.models.categoria_model import Categoria

# =========================================
# SCHEMAS
# =========================================

from app.schemas.categoria_schema import (
    CategoriaCreate,
    CategoriaResponse
)

# =========================================
# ROLES
# =========================================

from app.dependencies.roles import require_admin

# =========================================
# ROUTER
# =========================================

router = APIRouter(
    prefix="/categorias",
    tags=["Categorias"]
)

# =========================================
# DATABASE SESSION
# =========================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()

# =========================================
# CREAR CATEGORIA
# =========================================

@router.post(
    "/",
    response_model=CategoriaResponse
)
def crear_categoria(

    categoria: CategoriaCreate,

    db: Session = Depends(get_db),

    usuario = Depends(require_admin)

):

    categoria_existente = db.query(
        Categoria
    ).filter(
        Categoria.nombre == categoria.nombre
    ).first()

    if categoria_existente:

        raise HTTPException(
            status_code=400,
            detail="La categoría ya existe"
        )

    nueva_categoria = Categoria(
        nombre=categoria.nombre
    )

    db.add(nueva_categoria)

    db.commit()

    db.refresh(nueva_categoria)

    return nueva_categoria

# =========================================
# LISTAR CATEGORIAS
# =========================================

@router.get(
    "/",
    response_model=list[CategoriaResponse]
)
def listar_categorias(

    db: Session = Depends(get_db),

    usuario = Depends(require_admin)

):

    categorias = db.query(
        Categoria
    ).all()

    return categorias

# =========================================
# OBTENER CATEGORIA
# =========================================

@router.get(
    "/{id_categoria}",
    response_model=CategoriaResponse
)
def obtener_categoria(

    id_categoria: int,

    db: Session = Depends(get_db),

    usuario = Depends(require_admin)

):

    categoria = db.query(
        Categoria
    ).filter(
        Categoria.id_categoria == id_categoria
    ).first()

    if not categoria:

        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return categoria

# =========================================
# ACTUALIZAR CATEGORIA
# =========================================

@router.put(
    "/{id_categoria}",
    response_model=CategoriaResponse
)
def actualizar_categoria(

    id_categoria: int,

    datos: CategoriaCreate,

    db: Session = Depends(get_db),

    usuario = Depends(require_admin)

):

    categoria = db.query(
        Categoria
    ).filter(
        Categoria.id_categoria == id_categoria
    ).first()

    if not categoria:

        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    categoria.nombre = datos.nombre

    db.commit()

    db.refresh(categoria)

    return categoria

# =========================================
# ELIMINAR CATEGORIA
# =========================================

@router.delete("/{id_categoria}")
def eliminar_categoria(

    id_categoria: int,

    db: Session = Depends(get_db),

    usuario = Depends(require_admin)

):

    categoria = db.query(
        Categoria
    ).filter(
        Categoria.id_categoria == id_categoria
    ).first()

    if not categoria:

        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    db.delete(categoria)

    db.commit()

    return {
        "message": "Categoría eliminada"
    }