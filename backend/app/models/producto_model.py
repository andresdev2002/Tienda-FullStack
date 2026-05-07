from sqlalchemy import Column, Integer, String, DECIMAL, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    
    detalles = relationship("DetalleVenta")

    nombre = Column(String(100), nullable=False)

    precio = Column(DECIMAL(10,2), nullable=False)

    stock = Column(Integer, default=0)

    creado_en = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    actualizado_en = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )