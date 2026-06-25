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

from app.models.proveedor_model import Proveedor

from app.dependencies.roles import (
    require_admin,
    require_admin_or_bodeguero
)

# =========================================
# SCHEMAS
# =========================================

from app.schemas.proveedor_schema import (
    ProveedorCreate,
    ProveedorResponse
)

# =========================================
# ROUTER
# =========================================

router = APIRouter(
    prefix="/proveedores",
    tags=["Proveedores"]
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
# CREAR PROVEEDOR
# =========================================

@router.post(
    "/",
    response_model=ProveedorResponse
)
def crear_proveedor(
    proveedor: ProveedorCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_bodeguero)
):

    proveedor_existente = db.query(
        Proveedor
    ).filter(
        Proveedor.nombre == proveedor.nombre
    ).first()

    if proveedor_existente:

        raise HTTPException(
            status_code=400,
            detail="Proveedor ya existe"
        )

    nuevo_proveedor = Proveedor(

        nombre=proveedor.nombre,

        contacto=proveedor.contacto,

        telefono=proveedor.telefono,

        email=proveedor.email
    )

    db.add(nuevo_proveedor)

    db.commit()

    db.refresh(nuevo_proveedor)

    return nuevo_proveedor

# =========================================
# LISTAR PROVEEDORES
# =========================================

@router.get(
    "/",
    response_model=list[ProveedorResponse]
)
def listar_proveedores(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_bodeguero)
):

    proveedores = db.query(
        Proveedor
    ).all()

    return proveedores

# =========================================
# OBTENER PROVEEDOR
# =========================================

@router.get(
    "/{id_proveedor}",
    response_model=ProveedorResponse
)
def obtener_proveedor(
    id_proveedor: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_bodeguero)
):

    proveedor = db.query(
        Proveedor
    ).filter(
        Proveedor.id_proveedor == id_proveedor
    ).first()

    if not proveedor:

        raise HTTPException(
            status_code=404,
            detail="Proveedor no encontrado"
        )

    return proveedor

# =========================================
# ACTUALIZAR PROVEEDOR
# =========================================

@router.put(
    "/{id_proveedor}",
    response_model=ProveedorResponse
)
def actualizar_proveedor(
    id_proveedor: int,
    datos: ProveedorCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_bodeguero)
):

    proveedor = db.query(
        Proveedor
    ).filter(
        Proveedor.id_proveedor == id_proveedor
    ).first()

    if not proveedor:

        raise HTTPException(
            status_code=404,
            detail="Proveedor no encontrado"
        )

    proveedor.nombre = datos.nombre
    proveedor.contacto = datos.contacto
    proveedor.telefono = datos.telefono
    proveedor.email = datos.email

    db.commit()

    db.refresh(proveedor)

    return proveedor

# =========================================
# ELIMINAR PROVEEDOR
# =========================================

@router.delete("/{id_proveedor}")
def eliminar_proveedor(
    id_proveedor: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_admin)
):

    proveedor = db.query(
        Proveedor
    ).filter(
        Proveedor.id_proveedor == id_proveedor
    ).first()

    if not proveedor:

        raise HTTPException(
            status_code=404,
            detail="Proveedor no encontrado"
        )

    db.delete(proveedor)

    db.commit()

    return {
        "message": "Proveedor eliminado"
    }