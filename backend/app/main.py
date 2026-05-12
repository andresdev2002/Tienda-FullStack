from fastapi import FastAPI

# Base de datos
from app.database import engine, Base

# Importar modelos
from app.models.usuario_model import Usuario
from app.models.producto_model import Producto
from app.models.venta_model import Venta
from app.models.detalle_venta_model import DetalleVenta

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
@app.get("/")
def home():
    return {
        "message": "Backend funcionando correctamente"
    }