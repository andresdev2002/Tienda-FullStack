import {
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import TableSearchBar from "../components/common/TableSearchBar";

import { AuthContext } from "../context/AuthContext";

import {
    obtenerMovimientos
} from "../services/inventarioService";

function Inventario() {

    const { token } =
        useContext(AuthContext);

    const [movimientos,
        setMovimientos] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [busqueda, setBusqueda] =
        useState("");

    const movimientosFiltrados = movimientos.filter(
        (movimiento) => {

            const texto = busqueda.toLowerCase();

            return (
                movimiento.producto
                    ?.toLowerCase()
                    .includes(texto) ||

                movimiento.tipo_movimiento
                    ?.toLowerCase()
                    .includes(texto) ||

                movimiento.observacion
                    ?.toLowerCase()
                    .includes(texto)
            );
        }
    );

    useEffect(() => {

        cargarMovimientos();

    }, []);

    const cargarMovimientos =
    async () => {

        try {

            const data =
                await obtenerMovimientos(
                    token
                );

            setMovimientos(data);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);
        }
    };

    return (

        <Layout>

            <PageHeader
                titulo="Inventario"
                descripcion="Historial de movimientos de stock"
            />

            <Paper sx={{ p: 2.5 }}>

                <TableSearchBar
                    value={busqueda}
                    onChange={setBusqueda}
                    placeholder="Buscar por producto, tipo u observación..."
                />

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                ID
                            </TableCell>

                            <TableCell>
                                Producto
                            </TableCell>

                            <TableCell>
                                Tipo
                            </TableCell>

                            <TableCell>
                                Cantidad
                            </TableCell>

                            <TableCell>
                                Observación
                            </TableCell>

                            <TableCell>
                                Fecha
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {!cargando &&
                            movimientosFiltrados.length === 0 && (

                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 2 }}
                                    >
                                        {movimientos.length === 0
                                            ? "Todavía no hay movimientos registrados."
                                            : "Ningún movimiento coincide con la búsqueda."}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {movimientosFiltrados.map(
                            (movimiento) => (

                            <TableRow
                                key={
                                    movimiento.id_movimiento
                                }
                            >

                                <TableCell>
                                    {
                                    movimiento.id_movimiento
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                    movimiento.producto
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                    movimiento.tipo_movimiento
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                    movimiento.cantidad
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                    movimiento.observacion
                                    }
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        movimiento.fecha_movimiento
                                    ).toLocaleString("es-CO")}
                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </Paper>

        </Layout>
    );
}

export default Inventario;
