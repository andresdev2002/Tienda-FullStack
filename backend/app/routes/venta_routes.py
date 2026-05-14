from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.venta_model import Venta
from app.models.detalle_venta_model import DetalleVenta
from app.models.producto_model import Producto

from app.schemas.venta_schema import VentaCreate
from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/ventas",
    tags=["Ventas"]
)

# =========================
# DB
# =========================
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# =========================
# CREAR VENTA
# =========================
@router.post("/")
def crear_venta(
    venta: VentaCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    nueva_venta = Venta()

    db.add(nueva_venta)

    db.commit()

    db.refresh(nueva_venta)

    for item in venta.productos:

        producto = db.query(Producto).filter(
            Producto.id == item.producto_id
        ).first()

        if not producto:

            raise HTTPException(
                status_code=404,
                detail=f"Producto {item.producto_id} no existe"
            )

        # =========================
        # VALIDAR STOCK
        # =========================
        if producto.stock < item.cantidad:

            raise HTTPException(
                status_code=400,
                detail=f"Stock insuficiente para {producto.nombre}"
            )

        # =========================
        # DESCONTAR STOCK
        # =========================
        producto.stock -= item.cantidad

        detalle = DetalleVenta(
            venta_id=nueva_venta.id,
            producto_id=producto.id,
            cantidad=item.cantidad,
            precio=producto.precio
        )

        db.add(detalle)

    db.commit()

    return {
        "message": "Venta registrada correctamente",
        "venta_id": nueva_venta.id
    }