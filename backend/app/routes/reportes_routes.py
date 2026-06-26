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
#GANANCIAS TOTALES
#==========================
# Ganancia = ingreso de venta - costo del producto.
# Solo se cuentan ventas con estado distinto de
# "DEVUELTA": una venta devuelta no debería sumar
# a la ganancia, porque el dinero y el producto
# volvieron. (Nota: el costo usado es el
# precio_compra ACTUAL del producto, no el que
# tenía en el momento exacto de cada venta -  si
# los costos cambian con el tiempo, esto es una
# aproximación, igual que utilidad_mes en el
# dashboard.)

@router.get("/ganancias")
def ganancias_totales(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    detalles = db.query(DetalleVenta).join(
        Venta, Venta.id_venta == DetalleVenta.venta_id
    ).filter(
        Venta.estado != "DEVUELTA"
    ).all()

    ingresos_totales = 0.0
    costos_totales = 0.0
    por_producto = {}

    for detalle in detalles:

        producto = detalle.producto

        if not producto:
            continue

        ingreso = float(detalle.subtotal)
        costo = float(producto.precio_compra) * detalle.cantidad

        ingresos_totales += ingreso
        costos_totales += costo

        if producto.nombre not in por_producto:

            por_producto[producto.nombre] = {
                "producto": producto.nombre,
                "unidades_vendidas": 0,
                "ingresos": 0.0,
                "costos": 0.0
            }

        por_producto[producto.nombre]["unidades_vendidas"] += detalle.cantidad
        por_producto[producto.nombre]["ingresos"] += ingreso
        por_producto[producto.nombre]["costos"] += costo

    detalle_por_producto = []

    for item in por_producto.values():

        item["ingresos"] = round(item["ingresos"], 2)
        item["costos"] = round(item["costos"], 2)
        item["ganancia"] = round(
            item["ingresos"] - item["costos"], 2
        )

        detalle_por_producto.append(item)

    detalle_por_producto.sort(
        key=lambda x: x["ganancia"],
        reverse=True
    )

    return {
        "ingresos_totales": round(ingresos_totales, 2),
        "costos_totales": round(costos_totales, 2),
        "ganancia_total": round(
            ingresos_totales - costos_totales, 2
        ),
        "detalle_por_producto": detalle_por_producto
    }

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
    ).limit(50).all()

    return [
        {
            "producto": m.producto.nombre if m.producto else None,
            "usuario": m.usuario.nombre if m.usuario else None,
            "tipo": m.tipo_movimiento,
            "cantidad": m.cantidad,
            "observacion": m.observacion,
            "fecha": m.fecha_movimiento
        }
        for m in movimientos
    ]
