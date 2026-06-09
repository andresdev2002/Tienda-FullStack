# =========================================
# FASTAPI
# =========================================

from fastapi import APIRouter, Depends, HTTPException
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
from app.models.cliente_model import Cliente
from app.models.movimiento_inventario_model import MovimientoInventario

# =========================================
# SCHEMAS
# =========================================

from app.schemas.venta_schema import VentaCreate

# =========================================
# AUTH
# =========================================

from app.dependencies.roles import require_admin_or_vendedor

# =========================================
# ROUTER
# =========================================

router = APIRouter(
    prefix="/ventas",
    tags=["Ventas"]
)

# =========================================
# DB SESSION
# =========================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================================
# CREAR VENTA (POS COMPLETO)
# =========================================

@router.post("/")
def crear_venta(
    datos: VentaCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    try:

        # =========================================
        # VALIDAR CLIENTE
        # =========================================

        cliente = db.query(Cliente).filter(
            Cliente.id_cliente == datos.cliente_id
        ).first()

        if not cliente:
            raise HTTPException(status_code=404, detail="Cliente no existe")

        # =========================================
        # CREAR VENTA BASE
        # =========================================

        total_venta = 0

        nueva_venta = Venta(
            usuario_id=usuario.id_usuario,
            cliente_id=datos.cliente_id,
            metodo_pago=datos.metodo_pago,
            total=0
        )

        db.add(nueva_venta)

        # IMPORTANTE: obtener ID sin commit
        db.flush()

        # =========================================
        # DETALLES DE VENTA
        # =========================================

        for item in datos.detalles:

            # BUSCAR PRODUCTO
            producto = db.query(Producto).filter(
                Producto.id_producto == item.producto_id
            ).first()

            if not producto:
                raise HTTPException(
                    status_code=404,
                    detail=f"Producto {item.producto_id} no encontrado"
                )

            # VALIDAR STOCK
            if producto.stock_actual < item.cantidad:
                raise HTTPException(
                    status_code=400,
                    detail=f"Stock insuficiente para {producto.nombre}"
                )

            # CALCULAR SUBTOTAL
            subtotal = producto.precio_venta * item.cantidad
            total_venta += subtotal

            # CREAR DETALLE
            detalle = DetalleVenta(
                venta_id=nueva_venta.id_venta,
                producto_id=producto.id_producto,
                cantidad=item.cantidad,
                precio_unitario=producto.precio_venta,
                subtotal=subtotal
            )

            db.add(detalle)

            # DESCONTAR STOCK
            producto.stock_actual -= item.cantidad

            # MOVIMIENTO INVENTARIO (SALIDA)
            movimiento = MovimientoInventario(
                producto_id=producto.id_producto,
                usuario_id=usuario.id_usuario,
                tipo_movimiento="SALIDA",
                cantidad=item.cantidad,
                observacion=f"Venta ID {nueva_venta.id_venta}"
            )

            db.add(movimiento)

        # =========================================
        # TOTAL FINAL
        # =========================================

        nueva_venta.total = total_venta

        # =========================================
        # GUARDAR TODO
        # =========================================

        db.commit()

        return {
            "message": "Venta creada correctamente",
            "venta_id": nueva_venta.id_venta,
            "total_venta": total_venta
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))