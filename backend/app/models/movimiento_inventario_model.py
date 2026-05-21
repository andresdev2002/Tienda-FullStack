from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import Enum
from sqlalchemy import ForeignKey
from sqlalchemy import TIMESTAMP

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database import Base


class MovimientoInventario(Base):

    __tablename__ = "movimientos_inventario"

    id_movimiento = Column(
        Integer,
        primary_key=True,
        index=True
    )

    producto_id = Column(
        Integer,
        ForeignKey("productos.id_producto")
    )

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id_usuario")
    )

    tipo_movimiento = Column(
        Enum(
            "ENTRADA",
            "SALIDA",
            "AJUSTE",
            "DEVOLUCION"
        )
    )

    cantidad = Column(
        Integer
    )

    observacion = Column(
        Text
    )

    fecha_movimiento = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    producto = relationship(
        "Producto"
    )

    usuario = relationship(
        "Usuario"
    )