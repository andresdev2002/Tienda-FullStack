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
        }
    };

    return (

        <Layout>

            <Typography
                variant="h4"
                gutterBottom
            >
                Inventario
            </Typography>

            <Paper sx={{ p: 2 }}>

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

                        {movimientos.map(
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