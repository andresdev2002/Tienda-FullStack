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

import ModalProveedor from "../components/proveedores/ModalProveedor";

import {
    obtenerProveedores,
    eliminarProveedor
} from "../services/proveedorService";

import { AuthContext } from "../context/AuthContext";

function Proveedores() {

    const { token } = useContext(AuthContext);

    // =========================================
    // ESTADOS
    // =========================================

    const [proveedores, setProveedores] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [openModal, setOpenModal] =
        useState(false);

    const [proveedorEditar,
        setProveedorEditar] =
        useState(null);

    const [busqueda, setBusqueda] =
        useState("");

    const proveedoresFiltrados = proveedores.filter(
        (proveedor) => {

            const texto = busqueda.toLowerCase();

            return (
                proveedor.nombre
                    ?.toLowerCase()
                    .includes(texto) ||

                proveedor.contacto
                    ?.toLowerCase()
                    .includes(texto) ||

                proveedor.email
                    ?.toLowerCase()
                    .includes(texto) ||

                proveedor.telefono
                    ?.toLowerCase()
                    .includes(texto)
            );
        }
    );

    // =========================================
    // CARGAR PROVEEDORES
    // =========================================

    useEffect(() => {

        cargarProveedores();

    }, []);

    const cargarProveedores =
        async () => {

        try {

            const data =
                await obtenerProveedores(token);

            setProveedores(data);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);
        }
    };

    // =========================================
    // ELIMINAR PROVEEDOR
    // =========================================

    const eliminar = async (id) => {

        const confirmar =
            window.confirm(
                "¿Eliminar proveedor?"
            );

        if (!confirmar) return;

        try {

            await eliminarProveedor(id, token);

            cargarProveedores();

        } catch (error) {

            console.error(error);

            alert(
                "Error al eliminar"
            );
        }
    };

    return (

        <Layout>

            <PageHeader
                titulo="Proveedores"
                descripcion="Empresas que te abastecen de productos"
                accion={
                    <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        onClick={() => {

                            setProveedorEditar(
                                null
                            );

                            setOpenModal(true);
                        }}
                    >
                        Nuevo Proveedor
                    </Button>
                }
            />

            <Paper sx={{ p: 2.5 }}>

                <TableSearchBar
                    value={busqueda}
                    onChange={setBusqueda}
                    placeholder="Buscar proveedor..."
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
                                Contacto
                            </TableCell>

                            <TableCell>
                                Teléfono
                            </TableCell>

                            <TableCell>
                                Email
                            </TableCell>

                            <TableCell>
                                Acciones
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {!cargando &&
                            proveedoresFiltrados.length === 0 && (

                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 2 }}
                                    >
                                        {proveedores.length === 0
                                            ? "No hay proveedores registrados todavía."
                                            : "Ningún proveedor coincide con la búsqueda."}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {proveedoresFiltrados.map(
                            (proveedor) => (

                            <TableRow
                                key={
                                    proveedor.id_proveedor
                                }
                            >

                                <TableCell>
                                    {proveedor.id_proveedor}
                                </TableCell>

                                <TableCell>
                                    {proveedor.nombre}
                                </TableCell>

                                <TableCell>
                                    {proveedor.contacto}
                                </TableCell>

                                <TableCell>
                                    {proveedor.telefono}
                                </TableCell>

                                <TableCell>
                                    {proveedor.email}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={
                                            <EditRoundedIcon fontSize="small" />
                                        }
                                        onClick={() => {

                                            setProveedorEditar(
                                                proveedor
                                            );

                                            setOpenModal(
                                                true
                                            );
                                        }}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        size="small"
                                        color="error"
                                        startIcon={
                                            <DeleteRoundedIcon fontSize="small" />
                                        }
                                        sx={{ ml: 1 }}
                                        onClick={() =>
                                            eliminar(
                                                proveedor.id_proveedor
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

            <ModalProveedor

                open={openModal}

                onClose={() =>
                    setOpenModal(false)
                }

                proveedorEditar={
                    proveedorEditar
                }

                cargarProveedores={
                    cargarProveedores
                }
            />

        </Layout>
    );
}

export default Proveedores;
