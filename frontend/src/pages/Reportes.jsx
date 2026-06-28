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

import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import KpiCard from "../components/dashboard/KpiCard";

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

    const [cargandoMovimientos, setCargandoMovimientos] =
        useState(true);

    useEffect(() => {

        cargarReportes();

    }, []);

    const cargarReportes = async () => {

        // Cada llamada va en su propio try/catch:
        // si "ganancias" falla, no debe impedir que
        // se intente "movimientos" también (y
        // viceversa). Antes estaban en el mismo try,
        // y un fallo en la primera ocultaba si la
        // segunda de verdad funcionaba o no.

        try {

            const dataGanancias =
                await obtenerGanancias(token);

            setGanancias(dataGanancias);

        } catch (error) {

            console.error(
                "Error cargando ganancias:",
                error
            );
        }

        try {

            const dataMovimientos =
                await obtenerMovimientos(token);

            setMovimientos(dataMovimientos);

        } catch (error) {

            console.error(
                "Error cargando movimientos:",
                error
            );

        } finally {

            setCargandoMovimientos(false);
        }
    };

    const ganador = ganancias?.ganancia_total >= 0;

    return (

        <Layout>

            <PageHeader
                titulo="Reportes"
                descripcion="Ganancias del negocio y trazabilidad de inventario"
            />

            {/* =========================================
                GANANCIAS TOTALES
                ========================================= */}

            {!ganancias && (

                <Typography
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Cargando reporte de ganancias...
                </Typography>
            )}

            {ganancias && (

                <>

                    <Grid container spacing={2.5} sx={{ mb: 3 }}>

                        <Grid xs={12} sm={6} md={4}>
                            <KpiCard
                                titulo="Ingresos Totales"
                                valor={ganancias.ingresos_totales}
                                icono={AttachMoneyRoundedIcon}
                                color="success"
                            />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <KpiCard
                                titulo="Costos Totales"
                                valor={ganancias.costos_totales}
                                icono={ReceiptLongRoundedIcon}
                                color="neutral"
                            />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <KpiCard
                                titulo="Ganancia Total"
                                valor={ganancias.ganancia_total}
                                icono={
                                    ganador
                                        ? TrendingUpRoundedIcon
                                        : TrendingDownRoundedIcon
                                }
                                color={ganador ? "primary" : "error"}
                            />
                        </Grid>

                    </Grid>

                    <Paper sx={{ p: 2.5, mb: 3 }}>

                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
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
                                            <Typography
                                                color="text.secondary"
                                                sx={{ py: 2 }}
                                            >
                                                Todavía no hay ventas
                                                registradas.
                                            </Typography>
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

                    </Paper>

                </>
            )}

            {/* =========================================
                MOVIMIENTOS DE INVENTARIO
                ========================================= */}

            <Paper sx={{ p: 2.5 }}>

                <Typography
                    variant="subtitle2"
                    color="text.secondary"
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

                        {!cargandoMovimientos &&
                            movimientos.length === 0 && (

                            <TableRow>

                                <TableCell colSpan={5}>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 2 }}
                                    >
                                        Todavía no hay movimientos
                                        registrados.
                                    </Typography>
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
