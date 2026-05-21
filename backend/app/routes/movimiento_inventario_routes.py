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

from app.models.producto_model import Producto

from app.models.movimiento_inventario_model import (
    MovimientoInventario
)

# =========================================
# SCHEMAS
# =========================================

from app.schemas.movimiento_inventario_schema import (
    MovimientoInventarioCreate,
    MovimientoInventarioResponse
)

# =========================================
# ROUTER
# =========================================

router = APIRouter(
    prefix="/movimientos",
    tags=["Movimientos Inventario"]
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
# CREAR MOVIMIENTO
# =========================================

@router.post(
    "/",
    response_model=MovimientoInventarioResponse
)
def crear_movimiento(

    # Datos recibidos desde Swagger
    datos: MovimientoInventarioCreate,

    # Sesión de base de datos
    db: Session = Depends(get_db)

):

    # =========================================
    # CREAR MOVIMIENTO
    # =========================================

    nuevo_movimiento = MovimientoInventario(

        # Producto relacionado
        producto_id=datos.producto_id,

        # Usuario relacionado
        usuario_id=datos.usuario_id,

        # Tipo de movimiento
        tipo_movimiento=datos.tipo_movimiento,

        # Cantidad movida
        cantidad=datos.cantidad,

        # Observación
        observacion=datos.observacion
    )

    # Guardar en memoria
    db.add(nuevo_movimiento)

    # Guardar en base de datos
    db.commit()

    # Refrescar datos
    db.refresh(nuevo_movimiento)

    # Retornar movimiento
    return nuevo_movimiento
    # =====================================
    # BUSCAR PRODUCTO
    # =====================================

    producto = db.query(
        Producto
    ).filter(
        Producto.id_producto == movimiento.producto_id
    ).first()

    if not producto:

        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    # =====================================
    # ENTRADA INVENTARIO
    # =====================================

    if movimiento.tipo_movimiento == "ENTRADA":

        producto.stock_actual += movimiento.cantidad

    # =====================================
    # SALIDA INVENTARIO
    # =====================================

    elif movimiento.tipo_movimiento == "SALIDA":

        if producto.stock_actual < movimiento.cantidad:

            raise HTTPException(
                status_code=400,
                detail="Stock insuficiente"
            )

        producto.stock_actual -= movimiento.cantidad

    else:

        raise HTTPException(
            status_code=400,
            detail="Tipo movimiento inválido"
        )

    # =====================================
    # CREAR MOVIMIENTO
    # =====================================

    nuevo_movimiento = MovimientoInventario(

        producto_id=movimiento.producto_id,

        usuario_id=movimiento.usuario_id,

        tipo_movimiento=movimiento.tipo_movimiento,

        cantidad=movimiento.cantidad,

        observacion=movimiento.observacion
    )

    db.add(nuevo_movimiento)

    db.commit()

    db.refresh(nuevo_movimiento)

    return nuevo_movimiento

# =========================================
# LISTAR MOVIMIENTOS
# =========================================

@router.get(
    "/",
    response_model=list[MovimientoInventarioResponse]
)
def listar_movimientos(
    db: Session = Depends(get_db)
):

    movimientos = db.query(
        MovimientoInventario
    ).all()

    return movimientos