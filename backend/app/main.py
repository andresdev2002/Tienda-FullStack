from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Base de datos
from app.database import engine, Base

# Importar modelos
from app.models.usuario_model import Usuario
from app.models.producto_model import Producto
from app.models.venta_model import Venta
from app.models.detalle_venta_model import DetalleVenta
from app.routes.productos_router import router as producto_router
from app.routes.auth_routes import router as auth_router
from app.routes.venta_routes import router as venta_router
from app.routes.reporte_routes import router as reporte_router

# =========================
# CREAR TABLAS
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# INICIAR FASTAPI
# =========================
app = FastAPI(
    title="API Tienda FullStack",
    description="Sistema de ventas con FastAPI y MySQL",
    version="1.0.0"
)
#============================
#Habilitando CORS en FastAPI.
#===========================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================
# RUTA PRINCIPAL
# =========================
app.include_router(producto_router)
@app.get("/")
def home():
    return {
        "message": "Backend funcionando correctamente"
    }

app.include_router(auth_router)
app.include_router(venta_router)
app.include_router(reporte_router)