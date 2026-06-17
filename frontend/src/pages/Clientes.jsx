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

import ModalCliente from "../components/clientes/ModalCliente";

import {
    obtenerClientes,
    eliminarCliente
} from "../services/clienteService";

function Clientes() {

    const [clientes, setClientes] =
        useState([]);

    const [openModal, setOpenModal] =
        useState(false);

    const [clienteEditar, setClienteEditar] =
        useState(null);

    useEffect(() => {

        cargarClientes();

    }, []);

    const cargarClientes = async () => {

        try {

            const data =
                await obtenerClientes();

            setClientes(data);

        } catch (error) {

            console.error(error);
        }
    };

    const eliminar = async (id) => {

        const confirmar = window.confirm(
            "¿Desea eliminar este cliente?"
        );

        if (!confirmar) return;

        try {

            await eliminarCliente(id);

            cargarClientes();

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
                Clientes
            </Typography>

            <Paper sx={{ p: 2 }}>

                <Button
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => {

                        setClienteEditar(null);

                        setOpenModal(true);
                    }}
                >
                    Nuevo Cliente
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

                        {clientes.map(
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