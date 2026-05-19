from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DECIMAL
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import TIMESTAMP
from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database import Base


class Producto(Base):

    __tablename__ = "productos"

    id_producto = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nombre = Column(
        String(100),
        nullable=False
    )

    descripcion = Column(
        Text
    )

    categoria_id = Column(
        Integer,
        ForeignKey("categorias.id_categoria")
    )

    proveedor_id = Column(
        Integer,
        ForeignKey("proveedores.id_proveedor")
    )

    sku = Column(
        String(50),
        unique=True
    )

    codigo_barras = Column(
        String(100)
    )

    precio_compra = Column(
        DECIMAL(10, 2)
    )

    precio_venta = Column(
        DECIMAL(10, 2)
    )

    stock_actual = Column(
        Integer,
        default=0
    )

    stock_minimo = Column(
        Integer,
        default=0
    )

    stock_maximo = Column(
        Integer,
        default=0
    )

    unidad_medida = Column(
        String(20)
    )

    estado = Column(
        Boolean,
        default=True
    )

    imagen_url = Column(
        String(255)
    )

    fecha_creacion = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    fecha_actualizacion = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )

    categoria = relationship(
        "Categoria"
    )

    proveedor = relationship(
        "Proveedor"
    )