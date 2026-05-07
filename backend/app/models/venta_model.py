from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base

class Venta(Base):
    __tablename__ = "ventas"

    id = Column(Integer, primary_key=True, index=True)

    fecha = Column(
        DateTime,
        server_default=func.now()
    )

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id")
    )

    usuario = relationship("Usuario")

    detalles = relationship(
        "DetalleVenta",
        back_populates="venta",
        cascade="all, delete"
    )