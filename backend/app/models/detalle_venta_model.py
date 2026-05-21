from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import DECIMAL
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.database import Base


class DetalleVenta(Base):

    __tablename__ = "detalle_ventas"

    id_detalle = Column(
        Integer,
        primary_key=True,
        index=True
    )

    venta_id = Column(
        Integer,
        ForeignKey("ventas.id_venta")
    )

    producto_id = Column(
        Integer,
        ForeignKey("productos.id_producto")
    )

    cantidad = Column(
        Integer
    )

    precio_unitario = Column(
        DECIMAL(10, 2)
    )

    subtotal = Column(
        DECIMAL(10, 2)
    )

    venta = relationship(
        "Venta"
    )

    producto = relationship(
        "Producto"
    )