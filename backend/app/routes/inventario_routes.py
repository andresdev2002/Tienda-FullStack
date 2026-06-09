from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.producto_model import Producto

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

    db: Session = Depends(get_db)

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

        usuario_id=4,

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

    db: Session = Depends(get_db)

):

    movimientos = db.query(
        MovimientoInventario
    ).all()

    return movimientos