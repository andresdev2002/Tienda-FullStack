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

from app.dependencies.roles import require_admin_or_bodeguero

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

    # Datos enviados desde Swagger
    datos: MovimientoInventarioCreate,

    # Sesión de base de datos
    db: Session = Depends(get_db),

    usuario = Depends(require_admin_or_bodeguero)

):

    # =====================================
    # BUSCAR PRODUCTO
    # =====================================

    producto = db.query(
        Producto
    ).filter(
        Producto.id_producto == datos.producto_id
    ).first()

    # Validar existencia
    if not producto:

        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    # =====================================
    # ENTRADA INVENTARIO
    # =====================================

    if datos.tipo_movimiento == "ENTRADA":

        producto.stock_actual += datos.cantidad

    # =====================================
    # SALIDA INVENTARIO
    # =====================================

    elif datos.tipo_movimiento == "SALIDA":

        # Validar stock
        if producto.stock_actual < datos.cantidad:

            raise HTTPException(
                status_code=400,
                detail="Stock insuficiente"
            )

        # Descontar stock
        producto.stock_actual -= datos.cantidad

    # =====================================
    # AJUSTE INVENTARIO
    # =====================================

    elif datos.tipo_movimiento == "AJUSTE":

        producto.stock_actual = datos.cantidad

    # =====================================
    # DEVOLUCION
    # =====================================

    elif datos.tipo_movimiento == "DEVOLUCION":

        producto.stock_actual += datos.cantidad

    # =====================================
    # TIPO INVÁLIDO
    # =====================================

    else:

        raise HTTPException(
            status_code=400,
            detail="Tipo movimiento inválido"
        )

    # =====================================
    # CREAR MOVIMIENTO
    # =====================================

    nuevo_movimiento = MovimientoInventario(

        producto_id=datos.producto_id,

        # No se usa datos.usuario_id: ese valor
        # venía del cliente sin validar, lo que
        # permitía atribuir el movimiento a
        # cualquier usuario. Se usa el usuario
        # autenticado del token.
        usuario_id=usuario.id_usuario,

        tipo_movimiento=datos.tipo_movimiento,

        cantidad=datos.cantidad,

        observacion=datos.observacion
    )

    # =====================================
    # GUARDAR EN BASE DE DATOS
    # =====================================

    db.add(nuevo_movimiento)

    db.commit()

    db.refresh(nuevo_movimiento)

    # =====================================
    # RESPUESTA
    # =====================================

    return nuevo_movimiento

# =========================================
# LISTAR MOVIMIENTOS
# =========================================

@router.get("/")
def listar_movimientos(
    db: Session = Depends(get_db),
    usuario = Depends(require_admin_or_bodeguero)
):

    movimientos = db.query(
        MovimientoInventario
    ).all()

    return [

        {
            "id_movimiento":
                movimiento.id_movimiento,

            "producto":
                movimiento.producto.nombre,

            "tipo_movimiento":
                movimiento.tipo_movimiento,

            "cantidad":
                movimiento.cantidad,

            "observacion":
                movimiento.observacion,

            "fecha_movimiento":
                movimiento.fecha_movimiento
        }

        for movimiento in movimientos
    ]