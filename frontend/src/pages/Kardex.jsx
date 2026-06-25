import Layout from "../components/layout/Layout";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
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

            <Typography
    variant="h4"
    gutterBottom
>
    Kardex por Producto
</Typography>

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
    margin="normal"
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

{kardex && (

    <>
        <Typography
            variant="h6"
            sx={{ mt: 3 }}
        >
            Producto: {kardex.producto}
        </Typography>

        <Typography>
            Stock actual:
            {" "}
            {kardex.stock_actual}
        </Typography>

        <Paper sx={{ mt: 3 }}>

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