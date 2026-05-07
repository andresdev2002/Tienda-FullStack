from sqlalchemy import Column, Integer, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship

from app.database import Base

class DetalleVenta(Base):
    __tablename__ = "detalle_ventas"

    id = Column(Integer, primary_key=True, index=True)

    venta_id = Column(
        Integer,
        ForeignKey("ventas.id")
    )

    producto_id = Column(
        Integer,
        ForeignKey("productos.id")
    )

    cantidad = Column(Integer, nullable=False)

    precio = Column(DECIMAL(10,2), nullable=False)

    venta = relationship(
        "Venta",
        back_populates="detalles"
    )

    producto = relationship("Producto")