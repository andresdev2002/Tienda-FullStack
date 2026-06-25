#=====================================
#BASE ROUTER
#=====================================

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import datetime, date

from app.database import SessionLocal

from app.dependencies.roles import require_admin_or_vendedor

from app.models.venta_model import Venta
from app.models.detalle_venta_model import DetalleVenta
from app.models.producto_model import Producto
from app.models.movimiento_inventario_model import MovimientoInventario

router = APIRouter(
    prefix="/reportes",
    tags=["Reportes"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#==========================
#VENTAS HOY
#==========================
@router.get("/ventas-hoy")
def ventas_hoy(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    hoy = date.today()

    ventas = db.query(Venta).filter(
        func.date(Venta.fecha_venta) == hoy
    ).all()

    total = sum(v.total for v in ventas)

    return {
        "fecha": str(hoy),
        "cantidad_ventas": len(ventas),
        "ingresos_totales": total
    }

#==========================
#VENTAS POR MES
#==========================
@router.get("/ventas-mes")
def ventas_mes(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    mes_actual = datetime.now().month
    anio_actual = datetime.now().year

    ventas = db.query(Venta).filter(
        extract("month", Venta.fecha_venta) == mes_actual,
        extract("year", Venta.fecha_venta) == anio_actual
    ).all()

    total = sum(v.total for v in ventas)

    return {
        "mes": mes_actual,
        "anio": anio_actual,
        "cantidad_ventas": len(ventas),
        "ingresos_totales": total
    }

#==========================
#PRODUCTOS MÁS VENDIDOS 
#==========================
@router.get("/top-productos")
def top_productos(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    resultado = db.query(
        Producto.nombre,
        func.sum(DetalleVenta.cantidad).label("total_vendido")
    ).join(DetalleVenta, Producto.id_producto == DetalleVenta.producto_id
    ).group_by(Producto.nombre
    ).order_by(func.sum(DetalleVenta.cantidad).desc()
    ).limit(5).all()

    return [
        {
            "producto": r[0],
            "cantidad_vendida": r[1]
        }
        for r in resultado
    ]

#==========================
#INGREOS TOTALES 
#==========================
@router.get("/ingresos-totales")
def ingresos_totales(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    total = db.query(func.sum(Venta.total)).scalar()

    return {
        "ingresos_totales": total or 0
    }

#==========================
#STOCK BAJO
#==========================
@router.get("/stock-bajo")
def stock_bajo(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    productos = db.query(Producto).filter(
        Producto.stock_actual <= Producto.stock_minimo
    ).all()

    return [
        {
            "producto": p.nombre,
            "stock_actual": p.stock_actual,
            "stock_minimo": p.stock_minimo
        }
        for p in productos
    ]

#==========================
#MOVIMIENTOS RECIENTES
#==========================

@router.get("/movimientos")
def movimientos(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    movimientos = db.query(MovimientoInventario).order_by(
        MovimientoInventario.fecha_movimiento.desc()
    ).limit(20).all()

    return [
        {
            "producto_id": m.producto_id,
            "tipo": m.tipo_movimiento,
            "cantidad": m.cantidad,
            "fecha": m.fecha_movimiento
        }
        for m in movimientos
    ]
