from fastapi import FastAPI

# Base de datos
from app.database import engine, Base

# Importar modelos
from app.models.usuario_model import Usuario
from app.models.producto_model import Producto
from app.models.venta_model import Venta
from app.models.detalle_venta_model import DetalleVenta
from app.routes.productos_router import router as producto_router
from app.routes.auth_routes import router as auth_router

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