from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.usuario_model import Usuario

from app.core.security import verify_token

oauth2_scheme = OAuth2PasswordBearer(

    tokenUrl="usuarios/login"
)

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


def get_current_user(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db)

):

    payload = verify_token(token)

    if not payload:

        raise HTTPException(

            status_code=401,

            detail="Token inválido"
        )

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.id_usuario == payload["id_usuario"]
    ).first()

    if not usuario:

        raise HTTPException(

            status_code=401,

            detail="Usuario no encontrado"
        )

    return usuario