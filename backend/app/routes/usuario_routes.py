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

from app.models.usuario_model import Usuario

# =========================================
# SCHEMAS
# =========================================

from app.schemas.usuario_schema import (
    UsuarioCreate,
    UsuarioResponse
)

# =========================================
# SEGURIDAD
# =========================================

from app.core.security import hash_password

# =========================================
# ROUTER
# =========================================

router = APIRouter(

    prefix="/usuarios",

    tags=["Usuarios"]
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
# CREAR USUARIO
# =========================================

@router.post(
    "/",
    response_model=UsuarioResponse
)
def crear_usuario(

    usuario: UsuarioCreate,

    db: Session = Depends(get_db)
):

    # =====================================
    # VERIFICAR EMAIL
    # =====================================

    usuario_existente = db.query(
        Usuario
    ).filter(
        Usuario.email == usuario.email
    ).first()

    if usuario_existente:

        raise HTTPException(

            status_code=400,

            detail="El email ya existe"
        )

    # =====================================
    # ENCRIPTAR PASSWORD
    # =====================================

    password_encriptado = hash_password(
        usuario.password
    )

    # =====================================
    # CREAR USUARIO
    # =====================================

    nuevo_usuario = Usuario(

        nombre=usuario.nombre,

        email=usuario.email,

        password=password_encriptado,

        rol_id=usuario.rol_id
    )

    # Guardar usuario
    db.add(nuevo_usuario)

    db.commit()

    db.refresh(nuevo_usuario)

    return nuevo_usuario