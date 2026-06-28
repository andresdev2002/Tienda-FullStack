import os

from dotenv import load_dotenv

from sqlalchemy import create_engine

from sqlalchemy.orm import declarative_base

from sqlalchemy.orm import sessionmaker

# =========================================
# VARIABLES DE ENTORNO
# =========================================

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# =========================================
# URL BASE DATOS
# =========================================

DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)


# =========================================
# ENGINE
# =========================================

engine = create_engine(
    DATABASE_URL
)


# =========================================
# SESIONES
# =========================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# =========================================
# BASE MODELOS
# =========================================

Base = declarative_base()
