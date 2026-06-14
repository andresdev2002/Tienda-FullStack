from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.producto_model import Producto

from app.dependencies.roles import (
    require_admin_or_bodeguero
)

from app.models.movimiento_inventario_model import (
    MovimientoInventario
)

from app.schemas.inventario_schema import (
    EntradaInventarioCreate
)

router = APIRouter(
    prefix="/inventario",
    tags=["Inventario"]
)


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()

        # =========================================
# ENTRADA INVENTARIO
# =========================================

@router.post("/entrada")
def entrada_inventario(

    datos: EntradaInventarioCreate,

    db: Session = Depends(get_db),

    usuario = Depends(
        require_admin_or_bodeguero
    )

):

    producto = db.query(
        Producto
    ).filter(
        Producto.id_producto == datos.producto_id
    ).first()

    if not producto:

        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    # Aumentar stock

    producto.stock_actual += datos.cantidad

    # Registrar movimiento

    movimiento = MovimientoInventario(

        producto_id=producto.id_producto,

        usuario_id=usuario.id_usuario,

        tipo_movimiento="ENTRADA",

        cantidad=datos.cantidad,

        observacion=datos.observacion
    )

    db.add(movimiento)

    db.commit()

    return {

        "message": "Entrada registrada",

        "producto": producto.nombre,

        "nuevo_stock": producto.stock_actual
    }

# =========================================
# LISTAR MOVIMIENTOS
# =========================================

@router.get("/movimientos")
def listar_movimientos(

    db: Session = Depends(get_db),

    usuario = Depends(
        require_admin_or_bodeguero
    )

):

    movimientos = db.query(
        MovimientoInventario
    ).all()

    return movimientos

# =========================================
# KARDEX POR PRODUCTO
# =========================================

@router.get("/kardex/{id_producto}")
def kardex_producto(

    id_producto: int,

    db: Session = Depends(get_db),

    usuario = Depends(
        require_admin_or_bodeguero
    )

):

    producto = db.query(
        Producto
    ).filter(
        Producto.id_producto == id_producto
    ).first()

    if not producto:

        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    movimientos = db.query(
        MovimientoInventario
    ).filter(
        MovimientoInventario.producto_id == id_producto
    ).all()

    resultado = []

    for movimiento in movimientos:

        resultado.append({

            "id_movimiento": movimiento.id_movimiento,

            "tipo_movimiento": movimiento.tipo_movimiento,

            "cantidad": movimiento.cantidad,

            "observacion": movimiento.observacion,

            "fecha_movimiento": movimiento.fecha_movimiento
        })

    return {

        "producto": producto.nombre,

        "stock_actual": producto.stock_actual,

        "movimientos": resultado
    }

# =========================================
# STOCK BAJO
# =========================================

@router.get("/stock-bajo")
def stock_bajo(

    db: Session = Depends(get_db),

    usuario = Depends(
        require_admin_or_bodeguero
    )

):

    productos = db.query(
        Producto
    ).filter(
        Producto.stock_actual <= Producto.stock_minimo
    ).all()

    resultado = []

    for producto in productos:

        resultado.append({

            "id_producto": producto.id_producto,

            "nombre": producto.nombre,

            "stock_actual": producto.stock_actual,

            "stock_minimo": producto.stock_minimo
        })

    return resultado