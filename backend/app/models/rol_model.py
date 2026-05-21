from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database import Base


class Rol(Base):

    __tablename__ = "roles"

    id_rol = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nombre = Column(
        String(50),
        nullable=False
    )