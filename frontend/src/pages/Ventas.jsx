import {
    Typography,
    Paper,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import {
    obtenerVentas
} from "../services/ventaService";

import ModalVenta from
"../components/ventas/ModalVenta";

function Ventas() {

    const [ventas, setVentas] =
        useState([]);

    const [openModal, setOpenModal] =
    useState(false);

    useEffect(() => {

        cargarVentas();

    }, []);

    const cargarVentas = async () => {

        try {

            const data =
                await obtenerVentas();

            setVentas(data);

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
                Ventas
            </Typography>

            <Paper sx={{ p: 2 }}>
                <Button
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() =>
                        setOpenModal(true)
                    }
                >
                    Nueva Venta
                </Button>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                ID
                            </TableCell>

                            <TableCell>
                                Cliente
                            </TableCell>

                            <TableCell>
                                Método Pago
                            </TableCell>

                            <TableCell>
                                Total
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {ventas.map((venta) => (

                            <TableRow
                                key={venta.id_venta}
                            >

                                <TableCell>
                                    {venta.id_venta}
                                </TableCell>

                                <TableCell>
                                    {venta.cliente}
                                </TableCell>

                                <TableCell>
                                    {venta.metodo_pago}
                                </TableCell>

                                <TableCell>
                                    {venta.total}
                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </Paper>

            <ModalVenta
                open={openModal}
                onClose={() => {

                    setOpenModal(false);

                    cargarVentas();

                }}
            />
        </Layout>
    );
}

export default Ventas;