from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import DECIMAL
from sqlalchemy import ForeignKey
from sqlalchemy import TIMESTAMP
from sqlalchemy import Enum
from sqlalchemy import String

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database import Base

# IMPORTS MODELOS
from app.models.usuario_model import Usuario
from app.models.cliente_model import Cliente


class Venta(Base):

    __tablename__ = "ventas"

    id_venta = Column(
        Integer,
        primary_key=True,
        index=True
    )

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id_usuario")
    )

    cliente_id = Column(
        Integer,
        ForeignKey("clientes.id_cliente")
    )

    metodo_pago = Column(
        Enum(
            "EFECTIVO",
            "TARJETA",
            "TRANSFERENCIA",
            "NEQUI"
        )
    )
# Estado de la venta
    estado = Column(
    String(20),
    default="ACTIVA"
)
    fecha_venta = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    total = Column(
        DECIMAL(10, 2)
    )

    usuario = relationship(
        "Usuario"
    )

    cliente = relationship(
        "Cliente"
    )
