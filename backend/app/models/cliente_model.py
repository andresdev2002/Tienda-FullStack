from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database import Base


class Cliente(Base):

    __tablename__ = "clientes"

    id_cliente = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nombre = Column(
        String(100)
    )

    telefono = Column(
        String(50)
    )

    email = Column(
        String(100)
    )