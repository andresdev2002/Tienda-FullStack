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

from app.dependencies.roles import require_vendedor

from app.dependencies.roles import (
    require_admin_or_vendedor
)

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

    datos: VentaCreate,

    db: Session = Depends(get_db),

    usuario = Depends(
        require_admin_or_vendedor
    )

):

    # =========================================
    # VARIABLE TOTAL VENTA
    # =========================================

    # Aquí acumularemos el total general
    total_venta = 0

    # =========================================
    # CREAR VENTA PRINCIPAL
    # =========================================

    nueva_venta = Venta(

    usuario_id=usuario.id_usuario,

    cliente_id=datos.cliente_id,

    metodo_pago=datos.metodo_pago,

    total=0
)
    # Guardar venta temporalmente
    db.add(nueva_venta)

    db.commit()

    # Refrescar para obtener el ID generado
    db.refresh(nueva_venta)

    # =========================================
    # RECORRER DETALLES
    # =========================================

    for item in datos.detalles:

        # =========================================
        # BUSCAR PRODUCTO
        # =========================================

        producto = db.query(
            Producto
        ).filter(
            Producto.id_producto == item.producto_id
        ).first()

        # =========================================
        # VALIDAR PRODUCTO
        # =========================================

        if not producto:

            raise HTTPException(
                status_code=404,
                detail=f"Producto {item.producto_id} no encontrado"
            )

        # =========================================
        # VALIDAR STOCK
        # =========================================

        if producto.stock_actual < item.cantidad:

            raise HTTPException(
                status_code=400,
                detail=f"Stock insuficiente para {producto.nombre}"
            )

        # =========================================
        # CALCULAR SUBTOTAL
        # =========================================

        subtotal = producto.precio_venta * item.cantidad

        # =========================================
        # ACUMULAR TOTAL GENERAL
        # =========================================

        total_venta += subtotal

        # =========================================
        # CREAR DETALLE VENTA
        # =========================================

        nuevo_detalle = DetalleVenta(

            venta_id=nueva_venta.id_venta,

            producto_id=producto.id_producto,

            cantidad=item.cantidad,

            precio_unitario=producto.precio_venta,

            subtotal=subtotal
        )

        # Guardar detalle
        db.add(nuevo_detalle)

        # =========================================
        # DESCONTAR STOCK
        # =========================================

        producto.stock_actual -= item.cantidad

        # =========================================
        # CREAR MOVIMIENTO INVENTARIO
        # =========================================

        nuevo_movimiento = MovimientoInventario(

    producto_id=producto.id_producto,

    usuario_id=usuario.id_usuario,

    tipo_movimiento="SALIDA",

    cantidad=item.cantidad,

    observacion=f"Venta realizada ID {nueva_venta.id_venta}"
)

        # Guardar movimiento
        db.add(nuevo_movimiento)

    # =========================================
    # GUARDAR TOTAL FINAL
    # =========================================

    nueva_venta.total = total_venta

    # =========================================
    # GUARDAR TODOS LOS CAMBIOS
    # =========================================

    db.commit()

    # =========================================
    # RESPUESTA FINAL
    # =========================================

    return {

        "message": "Venta creada correctamente",

        "venta_id": nueva_venta.id_venta,

        "total_venta": total_venta
    }