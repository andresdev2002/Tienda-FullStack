from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.cliente_model import Cliente
from app.schemas.cliente_schema import ClienteCreate

router = APIRouter(
    prefix="/clientes",
    tags=["Clientes"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#================================================
# CREAR CLIENTE 
#================================================

@router.post("/")
def crear_cliente(data: ClienteCreate, db: Session = Depends(get_db)):

    cliente = Cliente(
        nombre=data.nombre,
        telefono=data.telefono,
        email=data.email
    )

    db.add(cliente)
    db.commit()
    db.refresh(cliente)

    return cliente


#================================================
# LISTAR CLIENTE 
#================================================

@router.get("/")
def listar_clientes(db: Session = Depends(get_db)):

    return db.query(Cliente).all()

#================================================
#OBTENER CLIENTE 
#================================================

@router.get("/{id_cliente}")
def obtener_cliente(id_cliente: int, db: Session = Depends(get_db)):

    cliente = db.query(Cliente).filter(
        Cliente.id_cliente == id_cliente
    ).first()

    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    return cliente

#================================================
#ACTUALIZAR CLIENTE 
#================================================

@router.put("/{id_cliente}")
def actualizar_cliente(id_cliente: int, data: ClienteCreate, db: Session = Depends(get_db)):

    cliente = db.query(Cliente).filter(
        Cliente.id_cliente == id_cliente
    ).first()

    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    cliente.nombre = data.nombre
    cliente.telefono = data.telefono
    cliente.email = data.email

    db.commit()
    db.refresh(cliente)

    return cliente


#================================================
#ELIMINAR CLIENTE 
#================================================

@router.delete("/{id_cliente}")
def eliminar_cliente(id_cliente: int, db: Session = Depends(get_db)):

    cliente = db.query(Cliente).filter(
        Cliente.id_cliente == id_cliente
    ).first()

    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    db.delete(cliente)
    db.commit()

    return {"message": "Cliente eliminado"}