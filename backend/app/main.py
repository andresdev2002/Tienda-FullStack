from fastapi import FastAPI

from app.database import engine
from app.database import Base
from app.routes.categoria_routes import router as categoria_router
from app.routes.productos_routes import router as productos_router
from app.routes.proveedor_routes import router as proveedor_router
from app.routes.venta_routes import router as venta_router
from app.routes.usuario_routes import router as usuario_router
from app.routes.movimiento_inventario_routes import (
    router as movimiento_router
)
from app.models import *
from app.routes.inventario_routes import router as inventario_router
from app.routes.clientes_routes import router as clientes_router
# ========================================
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

app.include_router(categoria_router)
app.include_router(productos_router)
app.include_router(proveedor_router)
app.include_router(venta_router)
app.include_router(movimiento_router)
app.include_router(usuario_router)
app.include_router(inventario_router)
app.include_router(clientes_router)

