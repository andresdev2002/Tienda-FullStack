# =========================================
# FASTAPI
# =========================================

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

# =========================================
# SQLALCHEMY
# =========================================

from sqlalchemy.orm import Session

# =========================================
# DATABASE
# =========================================

from app.database import SessionLocal

# =========================================
# MODELOS
# =========================================

from app.models.producto_model import Producto

from app.models.categoria_model import Categoria

from app.models.proveedor_model import Proveedor

# =========================================
# SCHEMAS
# =========================================

from app.schemas.producto_schema import (
    ProductoCreate,
    ProductoResponse
)

# =========================================
# ROUTER
# =========================================

router = APIRouter(
    prefix="/productos",
    tags=["Productos"]
)

# =========================================
# DATABASE SESSION
# =========================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()

# =========================================
# CREAR PRODUCTO
# =========================================

@router.post(
    "/",
    response_model=ProductoResponse
)
def crear_producto(
    producto: ProductoCreate,
    db: Session = Depends(get_db)
):

    # Verificar categoría
    categoria = db.query(
        Categoria
    ).filter(
        Categoria.id_categoria == producto.categoria_id
    ).first()

    if not categoria:

        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    # Verificar proveedor
    proveedor = db.query(
        Proveedor
    ).filter(
        Proveedor.id_proveedor == producto.proveedor_id
    ).first()

    if not proveedor:

        raise HTTPException(
            status_code=404,
            detail="Proveedor no encontrado"
        )

    # Crear producto
    nuevo_producto = Producto(

        nombre=producto.nombre,

        descripcion=producto.descripcion,

        categoria_id=producto.categoria_id,

        proveedor_id=producto.proveedor_id,

        sku=producto.sku,

        codigo_barras=producto.codigo_barras,

        precio_compra=producto.precio_compra,

        precio_venta=producto.precio_venta,

        stock_actual=producto.stock_actual,

        stock_minimo=producto.stock_minimo,

        stock_maximo=producto.stock_maximo,

        unidad_medida=producto.unidad_medida,

        estado=producto.estado,

        imagen_url=producto.imagen_url
    )

    db.add(nuevo_producto)

    db.commit()

    db.refresh(nuevo_producto)

    return nuevo_producto

# =========================================
# LISTAR PRODUCTOS
# =========================================

@router.get(
    "/",
    response_model=list[ProductoResponse]
)
def listar_productos(
    db: Session = Depends(get_db)
):

    productos = db.query(
        Producto
    ).all()

    return productos

# =========================================
# OBTENER PRODUCTO
# =========================================

@router.get(
    "/{id_producto}",
    response_model=ProductoResponse
)
def obtener_producto(
    id_producto: int,
    db: Session = Depends(get_db)
):

    producto = db.query(
        Producto
    ).filter(
        Producto.id_producto == id_producto
    ).first()

    if not producto:

        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    return producto

# =========================================
# ACTUALIZAR PRODUCTO
# =========================================

@router.put(
    "/{id_producto}",
    response_model=ProductoResponse
)
def actualizar_producto(
    id_producto: int,
    datos: ProductoCreate,
    db: Session = Depends(get_db)
):

    producto = db.query(
        Producto
    ).filter(
        Producto.id_producto == id_producto
    ).first()

    if not producto:

        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    producto.nombre = datos.nombre
    producto.descripcion = datos.descripcion
    producto.categoria_id = datos.categoria_id
    producto.proveedor_id = datos.proveedor_id
    producto.sku = datos.sku
    producto.codigo_barras = datos.codigo_barras
    producto.precio_compra = datos.precio_compra
    producto.precio_venta = datos.precio_venta
    producto.stock_actual = datos.stock_actual
    producto.stock_minimo = datos.stock_minimo
    producto.stock_maximo = datos.stock_maximo
    producto.unidad_medida = datos.unidad_medida
    producto.estado = datos.estado
    producto.imagen_url = datos.imagen_url

    db.commit()

    db.refresh(producto)

    return producto

# =========================================
# ELIMINAR PRODUCTO
# =========================================

@router.delete("/{id_producto}")
def eliminar_producto(
    id_producto: int,
    db: Session = Depends(get_db)
):

    producto = db.query(
        Producto
    ).filter(
        Producto.id_producto == id_producto
    ).first()

    if not producto:

        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    db.delete(producto)

    db.commit()

    return {
        "message": "Producto eliminado"
    }