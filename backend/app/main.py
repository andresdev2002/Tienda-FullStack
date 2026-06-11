from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.database import Base

from app.routes.categoria_routes import router as categoria_router
from app.routes.productos_routes import router as productos_router
from app.routes.proveedor_routes import router as proveedor_router
from app.routes.venta_routes import router as venta_router
from app.routes.usuario_routes import router as usuario_router
from app.routes.movimiento_inventario_routes import router as movimiento_router
from app.routes.inventario_routes import router as inventario_router
from app.routes.clientes_routes import router as clientes_router
from app.routes.dashboard_routes import router as dashboard_router

from app.models import *

# =========================================
# APP
# =========================================

app = FastAPI(
    title="API Inventario Profesional"
)

# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# CREAR TABLAS
# =========================================

Base.metadata.create_all(bind=engine)

# =========================================
# HOME
# =========================================

@app.get("/")
def home():
    return {
        "message": "API funcionando correctamente"
    }

# =========================================
# ROUTERS
# =========================================

app.include_router(categoria_router)
app.include_router(productos_router)
app.include_router(proveedor_router)
app.include_router(venta_router)
app.include_router(movimiento_router)
app.include_router(usuario_router)
app.include_router(inventario_router)
app.include_router(clientes_router)
app.include_router(dashboard_router)