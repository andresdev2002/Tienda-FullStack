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
# CREAR VENTA
# =========================================

@router.post("/")
def crear_venta(
    datos: VentaCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_vendedor)
):

    try:

        cliente = db.query(Cliente).filter(
            Cliente.id_cliente == datos.cliente_id
        ).first()

        if not cliente:
            raise HTTPException(status_code=404, detail="Cliente no existe")

        total_venta = 0

        nueva_venta = Venta(
            usuario_id=usuario.id_usuario,
            cliente_id=datos.cliente_id,
            metodo_pago=datos.metodo_pago,
            total=0
        )

        db.add(nueva_venta)
        db.flush()

        for item in datos.detalles:

            producto = db.query(Producto).filter(
                Producto.id_producto == item.producto_id
            ).first()

            if not producto:
                raise HTTPException(status_code=404, detail="Producto no encontrado")

            if producto.stock_actual < item.cantidad:
                raise HTTPException(status_code=400, detail="Stock insuficiente")

            subtotal = producto.precio_venta * item.cantidad
            total_venta += subtotal

            detalle = DetalleVenta(
                venta_id=nueva_venta.id_venta,
                producto_id=producto.id_producto,
                cantidad=item.cantidad,
                precio_unitario=producto.precio_venta,
                subtotal=subtotal
            )

            db.add(detalle)

            producto.stock_actual -= item.cantidad

            movimiento = MovimientoInventario(
                producto_id=producto.id_producto,
                usuario_id=usuario.id_usuario,
                tipo_movimiento="SALIDA",
                cantidad=item.cantidad,
                observacion=f"Venta ID {nueva_venta.id_venta}"
            )

            db.add(movimiento)

        nueva_venta.total = total_venta

        db.commit()

        return {
            "message": "Venta creada correctamente",
            "venta_id": nueva_venta.id_venta,
            "total": total_venta
        }

    except HTTPException:
            db.rollback()
            raise

    except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )
    
    


# =========================================
# LISTAR VENTAS
# =========================================

@router.get("/")
def listar_ventas(db: Session = Depends(get_db)):

    ventas = db.query(Venta).all()

    return [
        {
            "id_venta": v.id_venta,
            "cliente": v.cliente.nombre if v.cliente else None,
            "usuario_id": v.usuario_id,
            "metodo_pago": v.metodo_pago,
            "fecha_venta": v.fecha_venta,
            "total": v.total,
            "estado": v.estado
        }
        for v in ventas
    ]


# =========================================
# OBTENER VENTA
# =========================================

@router.get("/{id_venta}")
def obtener_venta(id_venta: int, db: Session = Depends(get_db)):

    venta = db.query(Venta).filter(
        Venta.id_venta == id_venta
    ).first()

    if not venta:
        raise HTTPException(status_code=404)

    return {
        "id_venta": venta.id_venta,
        "cliente": venta.cliente.nombre if venta.cliente else None,
        "usuario_id": venta.usuario_id,
        "metodo_pago": venta.metodo_pago,
        "fecha_venta": venta.fecha_venta,
        "total": venta.total
    }


# =========================================
# DETALLE VENTA
# =========================================

@router.get("/{id_venta}/detalle")
def detalle_venta(id_venta: int, db: Session = Depends(get_db)):

    venta = db.query(Venta).filter(
        Venta.id_venta == id_venta
    ).first()

    if not venta:
        raise HTTPException(status_code=404)

    detalles = db.query(DetalleVenta).filter(
        DetalleVenta.venta_id == id_venta
    ).all()

    productos = [
        {
            "producto": d.producto.nombre,
            "cantidad": d.cantidad,
            "precio_unitario": d.precio_unitario,
            "subtotal": d.subtotal
        }
        for d in detalles
    ]

    return {
        "venta": venta.id_venta,
        "cliente": venta.cliente.nombre if venta.cliente else None,
        "fecha": venta.fecha_venta,
        "total": venta.total,
        "productos": productos
    }

    #Devolución venta
@router.post("/{id_venta}/devolver")
def devolver_venta(
    id_venta: int,

                    db: Session = Depends(get_db),

                    usuario = Depends(
                        require_admin_or_vendedor
                    )

                ):

                    venta = db.query(
                        Venta
                    ).filter(
                        Venta.id_venta == id_venta
                    ).first()

                    if not venta:

                        raise HTTPException(
                            status_code=404,
                            detail="Venta no encontrada"
                        )
# =========================================
# VALIDAR SI YA FUE DEVUELTA
# =========================================

                    if venta.estado == "DEVUELTA":

                        raise HTTPException(
                            status_code=400,
                            detail="La venta ya fue devuelta"
                        )

                    detalles = db.query(
                        DetalleVenta
                    ).filter(
                        DetalleVenta.venta_id == id_venta
                    ).all()

                    for detalle in detalles:

                        producto = db.query(
                            Producto
                        ).filter(
                            Producto.id_producto ==
                            detalle.producto_id
                        ).first()
                        #Devolver stock

                        producto.stock_actual += (
                            detalle.cantidad
                        )

                        movimiento = MovimientoInventario(

                            producto_id=
                                producto.id_producto,

                            usuario_id=
                                usuario.id_usuario,

                            tipo_movimiento=
                                "DEVOLUCION",

                            cantidad=
                                detalle.cantidad,

                            observacion=
                                f"Devolución Venta #{id_venta}"
                        )

                        db.add(movimiento)
                    venta.estado = "DEVUELTA"
                    db.commit()

                    return {
                        "message":
                        "Devolución realizada correctamente"
                    }
    