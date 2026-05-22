# =========================================
# SQLALCHEMY
# =========================================

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

# =========================================
# DATABASE
# =========================================

from app.database import Base

# =========================================
# MODELO USUARIO
# =========================================

class Usuario(Base):

    __tablename__ = "usuarios"

    # =====================================
    # ID USUARIO
    # =====================================

    id_usuario = Column(

        Integer,

        primary_key=True,

        index=True
    )

    # =====================================
    # NOMBRE
    # =====================================

    nombre = Column(

        String(100),

        nullable=False
    )

    # =====================================
    # EMAIL
    # =====================================

    email = Column(

        String(100),

        unique=True,

        nullable=False
    )

    # =====================================
    # PASSWORD
    # =====================================

    password = Column(

        String(255),

        nullable=False
    )

    # =====================================
    # ESTADO
    # =====================================

    estado = Column(

        Boolean,

        default=True
    )

    # =====================================
    # ROL
    # =====================================

    rol_id = Column(

        Integer,

        ForeignKey("roles.id_rol")
    )

    # =====================================
    # RELACIÓN ROL
    # =====================================

    rol = relationship(
        "Rol"
    )