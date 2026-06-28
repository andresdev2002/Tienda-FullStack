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

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import TableSearchBar from "../components/common/TableSearchBar";

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

    const [cargando, setCargando] =
        useState(true);

    const [openModal, setOpenModal] =
    useState(false);

    const [busqueda, setBusqueda] =
        useState("");

    const ventasFiltradas = ventas.filter(
        (venta) => {

            const texto = busqueda.toLowerCase();

            return (
                venta.cliente
                    ?.toLowerCase()
                    .includes(texto) ||

                venta.metodo_pago
                    ?.toLowerCase()
                    .includes(texto) ||

                String(venta.id_venta).includes(texto)
            );
        }
    );

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
                await obtenerVentas(token);

            setVentas(data);

        } catch (error) {

    console.error(error);

    alert(

        error.response?.data?.detail ||

        "Error al devolver venta"
    );
} finally {

    setCargando(false);
}
    };

    return (

        <Layout>

            <PageHeader
                titulo="Ventas"
                descripcion="Historial de ventas y devoluciones"
                accion={
                    <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        onClick={() =>
                            setOpenModal(true)
                        }
                    >
                        Nueva Venta
                    </Button>
                }
            />

            <Paper sx={{ p: 2.5 }}>

                <TableSearchBar
                    value={busqueda}
                    onChange={setBusqueda}
                    placeholder="Buscar por cliente, método de pago o ID..."
                />

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

                        {!cargando &&
                            ventasFiltradas.length === 0 && (

                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 2 }}
                                    >
                                        {ventas.length === 0
                                            ? "Todavía no hay ventas registradas."
                                            : "Ninguna venta coincide con la búsqueda."}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {ventasFiltradas.map((venta) => (

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

                                    size="small"

                                    startIcon={
                                        <ReplayRoundedIcon fontSize="small" />
                                    }

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

                                    Devolver

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
