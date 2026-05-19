from fastapi import FastAPI

from app.database import engine
from app.database import Base

from app.models import *


# =========================================
# CREAR TABLAS
# =========================================

Base.metadata.create_all(
    bind=engine
)


# =========================================
# APP
# =========================================

app = FastAPI(
    title="API Inventario Profesional"
)


# =========================================
# HOME
# =========================================

@app.get("/")
def home():

    return {
        "message": "API funcionando correctamente"
    }