from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.producto_model import Producto
from app.schemas.producto_schema import (
    ProductoCreate,
    ProductoUpdate,
    ProductoResponse
)

router = APIRouter(
    prefix="/productos",
    tags=["Productos"]
)

# =========================
# CONEXIÓN DB
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =========================
# OBTENER TODOS LOS PRODUCTOS
# =========================
@router.get("/", response_model=list[ProductoResponse])
def obtener_productos(db: Session = Depends(get_db)):

    productos = db.query(Producto).all()

    return productos

# =========================
# CREAR PRODUCTO
# =========================
@router.post("/", response_model=ProductoResponse)
def crear_producto(
    producto: ProductoCreate,
    db: Session = Depends(get_db)
):

    nuevo_producto = Producto(
        nombre=producto.nombre,
        precio=producto.precio,
        stock=producto.stock
    )

    db.add(nuevo_producto)

    db.commit()

    db.refresh(nuevo_producto)

    return nuevo_producto
# =========================
# OBTENER PRODUCTO POR ID
# =========================
@router.get("/{producto_id}", response_model=ProductoResponse)
def obtener_producto(
    producto_id: int,
    db: Session = Depends(get_db)
):

    producto = db.query(Producto).filter(
        Producto.id == producto_id
    ).first()

    if not producto:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    return producto

# =========================
# ACTUALIZAR PRODUCTO
# =========================
@router.put("/{producto_id}", response_model=ProductoResponse)
def actualizar_producto(
    producto_id: int,
    datos: ProductoUpdate,
    db: Session = Depends(get_db)
):

    producto = db.query(Producto).filter(
        Producto.id == producto_id
    ).first()

    if not producto:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    producto.nombre = datos.nombre
    producto.precio = datos.precio
    producto.stock = datos.stock

    db.commit()

    db.refresh(producto)

    return producto
# =========================
# ELIMINAR PRODUCTO
# =========================
@router.delete("/{producto_id}")
def eliminar_producto(
    producto_id: int,
    db: Session = Depends(get_db)
):

    producto = db.query(Producto).filter(
        Producto.id == producto_id
    ).first()

    if not producto:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    db.delete(producto)

    db.commit()

    return {
        "message": "Producto eliminado correctamente"
    }