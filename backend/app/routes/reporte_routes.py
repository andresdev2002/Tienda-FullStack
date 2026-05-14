from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import SessionLocal

from app.models.venta_model import Venta
from app.models.detalle_venta_model import DetalleVenta
from app.models.producto_model import Producto

router = APIRouter(
    prefix="/reportes",
    tags=["Reportes"]
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
# TOTAL INGRESOS
# =========================
@router.get("/ingresos")
def total_ingresos(
    db: Session = Depends(get_db)
):

    total = db.query(
        func.sum(
            DetalleVenta.precio * DetalleVenta.cantidad
        )
    ).scalar()

    return {
        "total_ingresos": total or 0
    }

# =========================
# TOTAL VENTAS
# =========================
@router.get("/ventas")
def total_ventas(
    db: Session = Depends(get_db)
):

    total = db.query(
        func.count(Venta.id)
    ).scalar()

    return {
        "numero_ventas": total
    }

# =========================
# PRODUCTO MÁS VENDIDO
# =========================
@router.get("/producto-mas-vendido")
def producto_mas_vendido(
    db: Session = Depends(get_db)
):

    resultado = db.query(
        Producto.nombre,
        func.sum(DetalleVenta.cantidad).label(
            "total_vendido"
        )
    ).join(
        DetalleVenta,
        Producto.id == DetalleVenta.producto_id
    ).group_by(
        Producto.nombre
    ).order_by(
        func.sum(DetalleVenta.cantidad).desc()
    ).first()

    return {
        "producto": resultado[0],
        "cantidad_vendida": resultado[1]
    }

# =========================
# PRODUCTOS POR PRECIO
# =========================
@router.get("/productos-por-precio")
def productos_por_precio(
    min_precio: float,
    max_precio: float,
    db: Session = Depends(get_db)
):

    productos = db.query(Producto).filter(
        Producto.precio >= min_precio,
        Producto.precio <= max_precio
    ).all()

    return productos