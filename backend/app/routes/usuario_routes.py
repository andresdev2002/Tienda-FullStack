# =========================================
# FASTAPI
# =========================================

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from app.dependencies.auth import get_current_user

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
    UsuarioResponse,
    LoginRequest,
    TokenResponse
)

# =========================================
# SEGURIDAD
# =========================================

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

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
    print("TIPO:", type(usuario.password))
    print("VALOR:", usuario.password)
    print("LONGITUD:", len(usuario.password))
    
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

# =========================================
# LOGIN
# =========================================

@router.post(
    "/login",
    response_model=TokenResponse
)
def login(

    datos: LoginRequest,

    db: Session = Depends(get_db)

):

    # =====================================
    # BUSCAR USUARIO
    # =====================================

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.email == datos.email
    ).first()

    # =====================================
    # VALIDAR USUARIO
    # =====================================

    if not usuario:

        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    # =====================================
    # VALIDAR PASSWORD
    # =====================================

    if not verify_password(
        datos.password,
        usuario.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    # =====================================
    # CREAR TOKEN
    # =====================================

    token = create_access_token({

        "sub": usuario.email,

        "id_usuario": usuario.id_usuario,

        "rol_id": usuario.rol_id
    })

    # =====================================
    # RESPUESTA
    # =====================================

    return {

        "access_token": token,

        "token_type": "bearer"
    }
# =========================================
# PERFIL USUARIO
# =========================================

@router.get("/perfil")
def perfil(

    usuario = Depends(get_current_user)

):

    return {

        "id": usuario.id_usuario,

        "nombre": usuario.nombre,

        "email": usuario.email
    }