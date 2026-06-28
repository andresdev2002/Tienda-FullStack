# =========================================
# JWT Y FECHAS
# =========================================

import os

from dotenv import load_dotenv

from jose import jwt

from datetime import datetime
from datetime import timedelta
from jose import JWTError
# =========================================
# ENCRIPTAR PASSWORDS
# =========================================

from passlib.context import CryptContext

# =========================================
# CONFIGURACIÓN JWT
# =========================================

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv("ALGORITHM")

ACCESS_TOKEN_EXPIRE_MINUTES = 60

# =========================================
# ENCRIPTADOR
# =========================================

pwd_context = CryptContext(

    schemes=["bcrypt"],

    deprecated="auto"
)

# =========================================
# ENCRIPTAR PASSWORD
# =========================================

def hash_password(password: str):

    return pwd_context.hash(password)

# =========================================
# VERIFICAR PASSWORD
# =========================================

def verify_password(
    plain_password,
    hashed_password
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )

# =========================================
# CREAR TOKEN JWT
# =========================================

def create_access_token(data: dict):

    # Copiar datos
    to_encode = data.copy()

    # Tiempo expiración
    expire = datetime.utcnow() + timedelta(

        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # Agregar expiración
    to_encode.update({

        "exp": expire
    })

    # Crear token
    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM
    )

    return encoded_jwt

def verify_token(token: str):

    try:

        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        return None