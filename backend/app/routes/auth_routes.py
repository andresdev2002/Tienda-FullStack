from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.usuario_model import Usuario

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

# =========================
# DB
# =========================
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# =========================
# REGISTRO
# =========================
@router.post("/register")
def register(
    username: str,
    password: str,
    db: Session = Depends(get_db)
):

    usuario_existente = db.query(Usuario).filter(
        Usuario.username == username
    ).first()

    if usuario_existente:

        raise HTTPException(
            status_code=400,
            detail="El usuario ya existe"
        )

    hashed_password = hash_password(password)

    nuevo_usuario = Usuario(
        username=username,
        password=hashed_password
    )

    db.add(nuevo_usuario)

    db.commit()

    return {
        "message": "Usuario creado correctamente"
    }

# =========================
# LOGIN
# =========================
@router.post("/login")
def login(
    username: str,
    password: str,
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter(
        Usuario.username == username
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    if not verify_password(
        password,
        usuario.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    token = create_access_token(
        data={
            "sub": usuario.username
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }