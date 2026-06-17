import {
    useEffect,
    useState
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

import ModalProveedor from "../components/proveedores/ModalProveedor";

import {
    obtenerProveedores,
    eliminarProveedor
} from "../services/proveedorService";

function Proveedores() {

    // =========================================
    // ESTADOS
    // =========================================

    const [proveedores, setProveedores] =
        useState([]);

    const [openModal, setOpenModal] =
        useState(false);

    const [proveedorEditar,
        setProveedorEditar] =
        useState(null);

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
                await obtenerProveedores();

            setProveedores(data);

        } catch (error) {

            console.error(error);
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

            await eliminarProveedor(id);

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

            <Typography
                variant="h4"
                gutterBottom
            >
                Proveedores
            </Typography>

            <Paper sx={{ p: 2 }}>

                <Button
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => {

                        setProveedorEditar(
                            null
                        );

                        setOpenModal(true);
                    }}
                >
                    Nuevo Proveedor
                </Button>

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

                        {proveedores.map(
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