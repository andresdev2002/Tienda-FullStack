from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    
    username = Column(String(50), unique=True, nullable=False)
    
    password = Column(String(255), nullable=False)

    creado_en = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    actualizado_en = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )