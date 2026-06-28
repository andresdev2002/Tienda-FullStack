import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box
} from "@mui/material";

import {
    Typography,
    TextField,
    MenuItem
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";

import {
    obtenerProductos
} from "../services/productoService";

import {
    obtenerKardex
} from "../services/kardexService";

function Kardex() {

    const { token } =
    useContext(AuthContext);

const [productos,
    setProductos] =
    useState([]);

const [productoId,
    setProductoId] =
    useState("");

const [kardex,
    setKardex] =
    useState(null);

    //Consulta cambio de producto
    useEffect(() => {

    if (productoId) {

        cargarKardex();
    }

}, [productoId]);

const cargarKardex =
async () => {

    try {

        const data =
            await obtenerKardex(
                productoId,
                token
            );

        setKardex(data);

    } catch (error) {

        console.error(error);
    }
};

    //Cargar productos
    useEffect(() => {

    cargarProductos();

}, []);

const cargarProductos =
async () => {

    try {

        const data =
            await obtenerProductos(token);

        setProductos(data);

    } catch (error) {

        console.error(error);
    }
};

    return (

        <Layout>

            <PageHeader
                titulo="Kardex por Producto"
                descripcion="Historial de movimientos de un producto específico"
            />

            <Paper sx={{ p: 2.5, maxWidth: 480, mb: 3 }}>

                <TextField
                    select
                    label="Producto"
                    value={productoId}
                    onChange={(e) =>
                        setProductoId(
                            e.target.value
                        )
                    }
                    fullWidth
                >

                    <MenuItem value="">
                        Seleccione
                    </MenuItem>

                    {productos.map(producto => (

                        <MenuItem
                            key={producto.id_producto}
                            value={producto.id_producto}
                        >
                            {producto.nombre}
                        </MenuItem>

                    ))}

                </TextField>

            </Paper>

{kardex && (

    <>
        <Paper sx={{ p: 2.5, mb: 3 }}>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1.5,
                    flexWrap: "wrap"
                }}
            >

                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700 }}
                >
                    {kardex.producto}
                </Typography>

                <Typography color="text.secondary">
                    · Stock actual:
                </Typography>

                <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{ fontWeight: 700 }}
                >
                    {kardex.stock_actual}
                </Typography>

            </Box>

        </Paper>

        <Paper sx={{ p: 2.5 }}>

    <Table>

        <TableHead>

            <TableRow>

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

            {kardex.movimientos.length === 0 && (

                <TableRow>
                    <TableCell colSpan={4}>
                        <Typography
                            color="text.secondary"
                            sx={{ py: 2 }}
                        >
                            Este producto todavía no
                            tiene movimientos.
                        </Typography>
                    </TableCell>
                </TableRow>
            )}

            {kardex.movimientos.map(
                (movimiento) => (

                <TableRow
                    key={
                        movimiento.id_movimiento
                    }
                >

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

                        {
                        new Date(
                            movimiento.fecha_movimiento
                        ).toLocaleString(
                            "es-CO"
                        )
                        }

                    </TableCell>

                </TableRow>

            ))}

        </TableBody>

    </Table>

</Paper>
    </>

)}

        </Layout>

    );
}

export default Kardex;
