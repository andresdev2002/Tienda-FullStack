from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.database import Base


class Usuario(Base):

    __tablename__ = "usuarios"

    id_usuario = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String(50),
        unique=True,
        nullable=False
    )

    password = Column(
        String(255),
        nullable=False
    )

    rol_id = Column(
        Integer,
        ForeignKey("roles.id_rol")
    )

    rol = relationship(
        "Rol"
    )