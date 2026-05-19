# =========================================
# FASTAPI
# =========================================

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

# =========================================
# SQLALCHEMY
# =========================================

from sqlalchemy.orm import Session

# =========================================
# DATABASE
# =========================================

from app.database import SessionLocal

# =========================================
# MODELOS
# =========================================

from app.models.venta_model import Venta

from app.models.detalle_venta_model import DetalleVenta

from app.models.producto_model import Producto

from app.models.movimiento_inventario_model import (
    MovimientoInventario
)

# =========================================
# SCHEMAS
# =========================================

from app.schemas.venta_schema import VentaCreate

# =========================================
# ROUTER
# =========================================

router = APIRouter(
    prefix="/ventas",
    tags=["Ventas"]
)

# =========================================
# DATABASE SESSION
# =========================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()

# =========================================
# CREAR VENTA
# =========================================

@router.post("/")
def crear_venta(
    venta: VentaCreate,
    db: Session = Depends(get_db)
):

    total_venta = 0

    # =====================================
    # VALIDAR STOCK
    # =====================================

    for item in venta.detalles:

        producto = db.query(
            Producto
        ).filter(
            Producto.id_producto == item.producto_id
        ).first()

        if not producto:

            raise HTTPException(
                status_code=404,
                detail=f"Producto {item.producto_id} no encontrado"
            )

        if producto.stock_actual < item.cantidad:

            raise HTTPException(
                status_code=400,
                detail=f"Stock insuficiente para {producto.nombre}"
            )

    # =====================================
    # CREAR VENTA
    # =====================================

    nueva_venta = Venta(

        cliente_id=venta.cliente_id,

        usuario_id=venta.usuario_id,

        total=0
    )

    db.add(nueva_venta)

    db.commit()

    db.refresh(nueva_venta)

    # =====================================
    # CREAR DETALLES
    # =====================================

    for item in venta.detalles:

        producto = db.query(
            Producto
        ).filter(
            Producto.id_producto == item.producto_id
        ).first()

        subtotal = (
            producto.precio_venta * item.cantidad
        )

        total_venta += subtotal

        # =================================
        # DESCONTAR STOCK
        # =================================

        producto.stock_actual -= item.cantidad

        # =================================
        # DETALLE VENTA
        # =================================

        detalle = DetalleVenta(

            venta_id=nueva_venta.id_venta,

            producto_id=item.producto_id,

            cantidad=item.cantidad,

            precio_unitario=producto.precio_venta,

            subtotal=subtotal
        )

        db.add(detalle)

        # =================================
        # MOVIMIENTO INVENTARIO
        # =================================

        movimiento = MovimientoInventario(

            producto_id=producto.id_producto,

            usuario_id=venta.usuario_id,

            tipo_movimiento="SALIDA",

            cantidad=item.cantidad,

            observacion=f"Venta #{nueva_venta.id_venta}"
        )

        db.add(movimiento)

    # =====================================
    # ACTUALIZAR TOTAL
    # =====================================

    nueva_venta.total = total_venta

    db.commit()

    return {
        "message": "Venta realizada correctamente",
        "total": total_venta
    }