from sqlalchemy import create_engine

from sqlalchemy.orm import declarative_base

from sqlalchemy.orm import sessionmaker


# =========================================
# URL BASE DATOS
# =========================================

DATABASE_URL = (
    "mysql+pymysql://root:root"
    "@localhost/tienda_inventario_pro"
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