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
    TableRow,
    TableCell,
    TableBody,
    Grid
} from "@mui/material";

import Layout from "../components/layout/Layout";

import {
    obtenerGanancias,
    obtenerMovimientos
} from "../services/reportesService";

import { AuthContext } from "../context/AuthContext";

function Reportes() {

    const { token } = useContext(AuthContext);

    const [ganancias, setGanancias] =
        useState(null);

    const [movimientos, setMovimientos] =
        useState([]);

    useEffect(() => {

        cargarReportes();

    }, []);

    const cargarReportes = async () => {

        try {

            const dataGanancias =
                await obtenerGanancias(token);

            const dataMovimientos =
                await obtenerMovimientos(token);

            setGanancias(dataGanancias);

            setMovimientos(dataMovimientos);

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
                Reportes
            </Typography>

            {/* =========================================
                GANANCIAS TOTALES
                ========================================= */}

            <Paper sx={{ p: 2, mb: 3 }}>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Ganancias Totales
                </Typography>

                {!ganancias && (

                    <Typography>
                        Cargando...
                    </Typography>
                )}

                {ganancias && (

                    <>

                        <Grid container spacing={3}>

                            <Grid xs={12} md={4}>

                                <Typography
                                    color="text.secondary"
                                >
                                    Ingresos Totales
                                </Typography>

                                <Typography variant="h5">
                                    {ganancias.ingresos_totales}
                                </Typography>

                            </Grid>

                            <Grid xs={12} md={4}>

                                <Typography
                                    color="text.secondary"
                                >
                                    Costos Totales
                                </Typography>

                                <Typography variant="h5">
                                    {ganancias.costos_totales}
                                </Typography>

                            </Grid>

                            <Grid xs={12} md={4}>

                                <Typography
                                    color="text.secondary"
                                >
                                    Ganancia Total
                                </Typography>

                                <Typography
                                    variant="h5"
                                    color={
                                        ganancias.ganancia_total >= 0
                                            ? "success.main"
                                            : "error"
                                    }
                                >
                                    {ganancias.ganancia_total}
                                </Typography>

                            </Grid>

                        </Grid>

                        <Typography
                            variant="subtitle1"
                            sx={{ mt: 3 }}
                            gutterBottom
                        >
                            Ganancia por Producto
                        </Typography>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Producto
                                    </TableCell>

                                    <TableCell align="right">
                                        Unidades Vendidas
                                    </TableCell>

                                    <TableCell align="right">
                                        Ingresos
                                    </TableCell>

                                    <TableCell align="right">
                                        Costos
                                    </TableCell>

                                    <TableCell align="right">
                                        Ganancia
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {ganancias.detalle_por_producto
                                    .length === 0 && (

                                    <TableRow>

                                        <TableCell colSpan={5}>
                                            Todavía no hay ventas
                                            registradas.
                                        </TableCell>

                                    </TableRow>
                                )}

                                {ganancias.detalle_por_producto.map(
                                    (item, index) => (

                                        <TableRow key={index}>

                                            <TableCell>
                                                {item.producto}
                                            </TableCell>

                                            <TableCell align="right">
                                                {item.unidades_vendidas}
                                            </TableCell>

                                            <TableCell align="right">
                                                {item.ingresos}
                                            </TableCell>

                                            <TableCell align="right">
                                                {item.costos}
                                            </TableCell>

                                            <TableCell align="right">
                                                {item.ganancia}
                                            </TableCell>

                                        </TableRow>
                                    )
                                )}

                            </TableBody>

                        </Table>

                    </>
                )}

            </Paper>

            {/* =========================================
                MOVIMIENTOS DE INVENTARIO
                ========================================= */}

            <Paper sx={{ p: 2 }}>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Historial de Movimientos de Inventario
                </Typography>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                Producto
                            </TableCell>

                            <TableCell>
                                Tipo
                            </TableCell>

                            <TableCell align="right">
                                Cantidad
                            </TableCell>

                            <TableCell>
                                Usuario
                            </TableCell>

                            <TableCell>
                                Fecha
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {movimientos.length === 0 && (

                            <TableRow>

                                <TableCell colSpan={5}>
                                    Todavía no hay movimientos
                                    registrados.
                                </TableCell>

                            </TableRow>
                        )}

                        {movimientos.map((m, index) => (

                            <TableRow key={index}>

                                <TableCell>
                                    {m.producto || "—"}
                                </TableCell>

                                <TableCell>
                                    {m.tipo}
                                </TableCell>

                                <TableCell align="right">
                                    {m.cantidad}
                                </TableCell>

                                <TableCell>
                                    {m.usuario || "—"}
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        m.fecha
                                    ).toLocaleString()}
                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </Paper>

        </Layout>
    );
}

export default Reportes;
