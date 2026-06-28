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

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import TableSearchBar from "../components/common/TableSearchBar";

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

    const [cargando, setCargando] =
        useState(true);

    const [openModal, setOpenModal] =
        useState(false);

    const [productoEditar, setProductoEditar] =
        useState(null);

    const [busqueda, setBusqueda] =
        useState("");

    // =========================================
    // FILTRO DE BÚSQUEDA
    // =========================================
    // Filtra sobre los datos ya cargados, no hace
    // una nueva petición al backend.

    const productosFiltrados = productos.filter(
        (producto) =>
            producto.nombre
                .toLowerCase()
                .includes(busqueda.toLowerCase())
    );

    // =========================================
    // CARGAR PRODUCTOS
    // =========================================

    useEffect(() => {

        cargarProductos();

    }, []);

    const cargarProductos = async () => {

        try {

            const data =
                await obtenerProductos(token);

            setProductos(data);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);
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

            <PageHeader
                titulo="Productos"
                descripcion="Catálogo de productos del inventario"
                accion={
                    <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
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
                }
            />

            <Paper sx={{ p: 2.5 }}>

                <TableSearchBar
                    value={busqueda}
                    onChange={setBusqueda}
                    placeholder="Buscar producto..."
                />

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

                        {!cargando &&
                            productosFiltrados.length === 0 && (

                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 2 }}
                                    >
                                        {productos.length === 0
                                            ? "No hay productos registrados todavía."
                                            : "Ningún producto coincide con la búsqueda."}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {productosFiltrados.map(
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
                                        startIcon={
                                            <EditRoundedIcon fontSize="small" />
                                        }
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
                                        startIcon={
                                            <DeleteRoundedIcon fontSize="small" />
                                        }
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
