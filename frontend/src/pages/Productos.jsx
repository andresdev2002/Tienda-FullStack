import {
    useEffect,
    useState,
    useContext
} from "react";

import {
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button
} from "@mui/material";

import Layout from "../components/layout/Layout";

import ModalProducto from "../components/productos/ModalProducto";

import {
    obtenerProductos,
    eliminarProducto
} from "../services/productoService";

import { AuthContext } from "../context/AuthContext";

function Productos() {

    // =========================================
    // CONTEXT AUTH
    // =========================================

    const { token } = useContext(
        AuthContext
    );

    // =========================================
    // ESTADOS
    // =========================================

    const [productos, setProductos] =
        useState([]);

    const [openModal, setOpenModal] =
        useState(false);

    const [productoEditar, setProductoEditar] =
        useState(null);

    // =========================================
    // CARGAR PRODUCTOS
    // =========================================

    useEffect(() => {

        cargarProductos();

    }, []);

    const cargarProductos = async () => {

        try {

            const data =
                await obtenerProductos();

            setProductos(data);

        } catch (error) {

            console.error(error);

        }
    };

    // =========================================
    // ELIMINAR PRODUCTO
    // =========================================

    const eliminar = async (id) => {

        const confirmar = window.confirm(
            "¿Desea eliminar este producto?"
        );

        if (!confirmar) return;

        try {

            await eliminarProducto(
                id,
                token
            );

            cargarProductos();

            alert(
                "Producto eliminado correctamente"
            );

        } catch (error) {

            console.error(error);

            alert(
                "Error al eliminar producto"
            );
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

            <Paper sx={{ p: 2 }}>

                {/* =========================================
                    BOTÓN NUEVO PRODUCTO
                ========================================= */}

                <Button
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => {

                        setProductoEditar(
                            null
                        );

                        setOpenModal(
                            true
                        );

                    }}
                >
                    Nuevo Producto
                </Button>

                {/* =========================================
                    TABLA PRODUCTOS
                ========================================= */}

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                ID
                            </TableCell>

                            <TableCell>
                                Nombre
                            </TableCell>

                            <TableCell>
                                Precio Venta
                            </TableCell>

                            <TableCell>
                                Stock
                            </TableCell>

                            <TableCell>
                                Acciones
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {productos.map(
                            (producto) => (

                            <TableRow
                                key={
                                    producto.id_producto
                                }
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

                                    {/* EDITAR */}

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() => {

                                            setProductoEditar(
                                                producto
                                            );

                                            setOpenModal(
                                                true
                                            );

                                        }}
                                    >
                                        Editar
                                    </Button>

                                    {/* ELIMINAR */}

                                    <Button
                                        color="error"
                                        size="small"
                                        onClick={() =>
                                            eliminar(
                                                producto.id_producto
                                            )
                                        }
                                    >
                                        Eliminar
                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </Paper>

            {/* =========================================
                MODAL PRODUCTOS
            ========================================= */}

            <ModalProducto
                open={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
                productoEditar={
                    productoEditar
                }
                cargarProductos={
                    cargarProductos
                }
            />

        </Layout>
    );
}

export default Productos;