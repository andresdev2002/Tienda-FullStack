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
    UsuarioUpdate,
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
# DEPENDENCIAS
# =========================================

from app.dependencies.auth import get_current_user

from app.dependencies.roles import require_admin

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

    db: Session = Depends(get_db),

    admin = Depends(require_admin)

):

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

    password_encriptado = hash_password(
        usuario.password
    )

    nuevo_usuario = Usuario(

        nombre=usuario.nombre,

        email=usuario.email,

        password=password_encriptado,

        rol_id=usuario.rol_id
    )

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

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.email == datos.email
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    if not verify_password(
        datos.password,
        usuario.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    if not usuario.estado:

        raise HTTPException(
            status_code=403,
            detail="Usuario inactivo. Contacta a un administrador"
        )

    token = create_access_token({

        "sub": usuario.email,

        "id_usuario": usuario.id_usuario,

        "rol_id": usuario.rol_id
    })

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

        "email": usuario.email,

        "rol_id": usuario.rol_id
    }
# =========================================
# SOLO ADMIN
# =========================================

@router.get("/solo-admin")
def solo_admin(

    usuario = Depends(require_admin)

):

    return {

        "mensaje": "Bienvenido ADMIN",

        "usuario": usuario.nombre
    }

# =========================================
# LISTAR USUARIOS
# =========================================

@router.get(
    "/",
    response_model=list[UsuarioResponse]
)
def listar_usuarios(

    db: Session = Depends(get_db),

    admin = Depends(require_admin)

):

    return db.query(Usuario).all()

# =========================================
# OBTENER UN USUARIO
# =========================================

@router.get(
    "/{id_usuario}",
    response_model=UsuarioResponse
)
def obtener_usuario(

    id_usuario: int,

    db: Session = Depends(get_db),

    admin = Depends(require_admin)

):

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return usuario

# =========================================
# ACTUALIZAR USUARIO
# =========================================

@router.put(
    "/{id_usuario}",
    response_model=UsuarioResponse
)
def actualizar_usuario(

    id_usuario: int,

    datos: UsuarioUpdate,

    db: Session = Depends(get_db),

    admin = Depends(require_admin)

):

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    email_existente = db.query(Usuario).filter(
        Usuario.email == datos.email,
        Usuario.id_usuario != id_usuario
    ).first()

    if email_existente:

        raise HTTPException(
            status_code=400,
            detail="El email ya está en uso por otro usuario"
        )

    usuario.nombre = datos.nombre
    usuario.email = datos.email
    usuario.rol_id = datos.rol_id

    db.commit()
    db.refresh(usuario)

    return usuario

# =========================================
# ACTIVAR / DESACTIVAR USUARIO
# =========================================

@router.patch(
    "/{id_usuario}/estado",
    response_model=UsuarioResponse
)
def cambiar_estado_usuario(

    id_usuario: int,

    db: Session = Depends(get_db),

    admin = Depends(require_admin)

):

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    if usuario.id_usuario == admin.id_usuario:

        raise HTTPException(
            status_code=400,
            detail="No puedes desactivar tu propio usuario"
        )

    usuario.estado = not usuario.estado

    db.commit()
    db.refresh(usuario)

    return usuario