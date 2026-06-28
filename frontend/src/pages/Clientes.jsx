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

import ModalCliente from "../components/clientes/ModalCliente";

import {
    obtenerClientes,
    eliminarCliente
} from "../services/clienteService";

import { AuthContext } from "../context/AuthContext";

function Clientes() {

    const { token } = useContext(AuthContext);

    const [clientes, setClientes] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [openModal, setOpenModal] =
        useState(false);

    const [clienteEditar, setClienteEditar] =
        useState(null);

    const [busqueda, setBusqueda] =
        useState("");

    const clientesFiltrados = clientes.filter(
        (cliente) => {

            const texto = busqueda.toLowerCase();

            return (
                cliente.nombre
                    ?.toLowerCase()
                    .includes(texto) ||

                cliente.email
                    ?.toLowerCase()
                    .includes(texto) ||

                cliente.telefono
                    ?.toLowerCase()
                    .includes(texto)
            );
        }
    );

    useEffect(() => {

        cargarClientes();

    }, []);

    const cargarClientes = async () => {

        try {

            const data =
                await obtenerClientes(token);

            setClientes(data);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);
        }
    };

    const eliminar = async (id) => {

        const confirmar = window.confirm(
            "¿Desea eliminar este cliente?"
        );

        if (!confirmar) return;

        try {

            await eliminarCliente(id, token);

            cargarClientes();

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <Layout>

            <PageHeader
                titulo="Clientes"
                descripcion="Personas y empresas a las que les vendes"
                accion={
                    <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        onClick={() => {

                            setClienteEditar(null);

                            setOpenModal(true);
                        }}
                    >
                        Nuevo Cliente
                    </Button>
                }
            />

            <Paper sx={{ p: 2.5 }}>

                <TableSearchBar
                    value={busqueda}
                    onChange={setBusqueda}
                    placeholder="Buscar cliente..."
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
                            clientesFiltrados.length === 0 && (

                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 2 }}
                                    >
                                        {clientes.length === 0
                                            ? "No hay clientes registrados todavía."
                                            : "Ningún cliente coincide con la búsqueda."}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {clientesFiltrados.map(
                            (cliente) => (

                            <TableRow
                                key={
                                    cliente.id_cliente
                                }
                            >

                                <TableCell>
                                    {cliente.id_cliente}
                                </TableCell>

                                <TableCell>
                                    {cliente.nombre}
                                </TableCell>

                                <TableCell>
                                    {cliente.telefono}
                                </TableCell>

                                <TableCell>
                                    {cliente.email}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={
                                            <EditRoundedIcon fontSize="small" />
                                        }
                                        sx={{ mr: 1 }}
                                        onClick={() => {

                                            setClienteEditar(
                                                cliente
                                            );

                                            setOpenModal(
                                                true
                                            );
                                        }}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        color="error"
                                        size="small"
                                        startIcon={
                                            <DeleteRoundedIcon fontSize="small" />
                                        }
                                        onClick={() =>
                                            eliminar(
                                                cliente.id_cliente
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

            <ModalCliente
                open={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
                clienteEditar={
                    clienteEditar
                }
                cargarClientes={
                    cargarClientes
                }
            />

        </Layout>
    );
}

export default Clientes;
