from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy import extract

from datetime import date
from datetime import datetime

from app.database import SessionLocal

from app.models.producto_model import Producto
from app.models.cliente_model import Cliente
from app.models.proveedor_model import Proveedor
from app.models.venta_model import Venta
from app.models.detalle_venta_model import DetalleVenta

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


# =========================================
# DASHBOARD GENERAL
# =========================================

@router.get("/")
def dashboard(

    db: Session = Depends(get_db)

):

    hoy = date.today()

    mes_actual = datetime.now().month
    anio_actual = datetime.now().year

    # =========================================
    # VENTAS HOY
    # =========================================

    ventas_hoy_lista = db.query(
        Venta
    ).filter(
        func.date(Venta.fecha_venta) == hoy
    ).all()

    ventas_hoy = len(ventas_hoy_lista)

    ingresos_hoy = sum(
        float(v.total)
        for v in ventas_hoy_lista
    )

    # =========================================
    # VENTAS MES
    # =========================================

    ventas_mes_lista = db.query(
        Venta
    ).filter(
        extract("month", Venta.fecha_venta) == mes_actual,
        extract("year", Venta.fecha_venta) == anio_actual
    ).all()

    ventas_mes = len(
        ventas_mes_lista
    )

    ingresos_mes = sum(
        float(v.total)
        for v in ventas_mes_lista
    )

    # =========================================
    # STOCK BAJO
    # =========================================

    productos_stock_bajo = db.query(
        Producto
    ).filter(
        Producto.stock_actual <= Producto.stock_minimo
    ).count()

    # =========================================
    # RESUMEN GENERAL
    # =========================================

    total_productos = db.query(
        Producto
    ).count()

    total_clientes = db.query(
        Cliente
    ).count()

    total_proveedores = db.query(
        Proveedor
    ).count()

    # =========================================
    # TOP PRODUCTOS
    # =========================================

    top_productos_query = db.query(
        Producto.nombre,
        func.sum(
            DetalleVenta.cantidad
        ).label("total_vendido")
    ).join(
        DetalleVenta,
        Producto.id_producto ==
        DetalleVenta.producto_id
    ).group_by(
        Producto.nombre
    ).order_by(
        func.sum(
            DetalleVenta.cantidad
        ).desc()
    ).limit(5).all()

    top_productos = []

    for item in top_productos_query:

        top_productos.append({

            "producto": item.nombre,

            "cantidad_vendida":
            item.total_vendido
        })

    # =========================================
    # ULTIMAS VENTAS
    # =========================================

    ultimas_ventas_query = db.query(
        Venta
    ).order_by(
        Venta.fecha_venta.desc()
    ).limit(10).all()

    ultimas_ventas = []

    for venta in ultimas_ventas_query:

        ultimas_ventas.append({

            "id_venta":
            venta.id_venta,

            "cliente":
            venta.cliente.nombre
            if venta.cliente
            else None,

            "total":
            float(venta.total),

            "fecha":
            venta.fecha_venta
        })

    # =========================================
    # UTILIDAD MES
    # =========================================

    utilidad_mes = 0

    detalles_mes = db.query(
        DetalleVenta
    ).join(
        Venta,
        Venta.id_venta ==
        DetalleVenta.venta_id
    ).filter(
        extract(
            "month",
            Venta.fecha_venta
        ) == mes_actual,

        extract(
            "year",
            Venta.fecha_venta
        ) == anio_actual
    ).all()

    for detalle in detalles_mes:

        producto = detalle.producto

        utilidad_mes += (

            float(
                producto.precio_venta
            )

            -

            float(
                producto.precio_compra
            )

        ) * detalle.cantidad

    # =========================================
    # VENTAS POR DIA
    # =========================================

    ventas_por_dia_query = db.query(

        func.date(
            Venta.fecha_venta
        ).label("fecha"),

        func.sum(
            Venta.total
        ).label("ventas")

    ).group_by(

        func.date(
            Venta.fecha_venta
        )

    ).order_by(

        func.date(
            Venta.fecha_venta
        )

    ).all()

    ventas_por_dia = []

    for item in ventas_por_dia_query:

        ventas_por_dia.append({

            "fecha":
            item.fecha,

            "ventas":
            float(item.ventas)
        })

    return {

        "kpis": {

            "ventas_hoy":
            ventas_hoy,

            "ingresos_hoy":
            ingresos_hoy,

            "ventas_mes":
            ventas_mes,

            "ingresos_mes":
            ingresos_mes,

            "utilidad_mes":
            utilidad_mes,

            "productos_stock_bajo":
            productos_stock_bajo
        },

        "resumen": {

            "total_productos":
            total_productos,

            "total_clientes":
            total_clientes,

            "total_proveedores":
            total_proveedores
        },

        "top_productos":
        top_productos,

        "ultimas_ventas":
        ultimas_ventas,

        "ventas_por_dia":
        ventas_por_dia
    }