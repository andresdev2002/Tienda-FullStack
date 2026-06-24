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

import ModalVenta from
"../components/ventas/ModalVenta";

import {
    obtenerVentas,
    devolverVenta
} from "../services/ventaService";

import { useContext } from "react";

import { AuthContext }
from "../context/AuthContext";

function Ventas() {

    const { token } =
    useContext(AuthContext);

    const [ventas, setVentas] =
        useState([]);

    const [openModal, setOpenModal] =
    useState(false);

    //Función devolver

const handleDevolver = async (
        idVenta
    ) => {

        const confirmar =
            window.confirm(
                "¿Desea devolver esta venta?"
            );

        if (!confirmar) return;

        try {

            await devolverVenta(
                idVenta,
                token
            );

            cargarVentas();

        } catch (error) {

            console.error(error);
        }
    };
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

    alert(

        error.response?.data?.detail ||

        "Error al devolver venta"
    );
}
    };

    return (

        <Layout>
        

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

                            <TableCell>
                                Estado
                            </TableCell>

                            <TableCell>
                                Acciones
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

                                <TableCell>

                                <Typography
                                        color={
                                            venta.estado === "DEVUELTA"
                                                ? "error"
                                                : "success"
                                        }
                                    >
                                        {venta.estado}
                                </Typography>

                                </TableCell>
                                
                                <TableCell>

                            <Button

                                    color="warning"

                                    variant="contained"

                                    disabled={
                                        venta.estado ===
                                        "DEVUELTA"
                                    }

                                    onClick={() =>
                                        handleDevolver(
                                            venta.id_venta
                                        )
                                    }

                                >

                                    DEVOLVER

                            </Button>
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