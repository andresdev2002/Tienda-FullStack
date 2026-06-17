import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ModalProducto from "../components/productos/ModalProducto";

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

import Layout from "../components/layout/Layout";

import { obtenerProductos } from "../services/productoService";

function Productos() {

  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // =========================================
// PRODUCTO SELECCIONADO
// =========================================

const [productoEditar, setProductoEditar] =
    useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>

      <Typography
        variant="h4"
        gutterBottom
      >
        Productos
      </Typography>

    <Paper>
<Button
  vButtonariant="contained"
  sx={{ mb: 2 }}
  onClick={() => {

    setProductoEditar(null);

    setOpenModal(true);

}}
>
  Nuevo Producto
</Button>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>ID</TableCell>

              <TableCell>Nombre</TableCell>

              <TableCell>Precio Venta</TableCell>

              <TableCell>Stock</TableCell>
              
              <TableCell>Acciones</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {productos.map((producto) => (

              <TableRow
                key={producto.id_producto}
              >

                <TableCell>
                  {producto.id_producto}
                </TableCell>

                <TableCell>
                  {producto.nombre}
                </TableCell>

                <TableCell>
                  {producto.precio_venta}
                </TableCell>

                <TableCell>
                  {producto.stock_actual}
                </TableCell>
                <TableCell>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {

                            setProductoEditar(
                                producto
                            );

                            setOpenModal(true);

                        }}
                    >
                        Editar
                    </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

<ModalProducto
    open={openModal}
    onClose={() => setOpenModal(false)}
    productoEditar={productoEditar}
    cargarProductos={cargarProductos}
/>

    </Layout>
  );
}



export default Productos;