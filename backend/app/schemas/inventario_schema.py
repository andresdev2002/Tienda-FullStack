from pydantic import BaseModel


class EntradaInventarioCreate(BaseModel):

    producto_id: int

    cantidad: int

    observacion: str