import {
    Typography,
    Paper,
    TextField,
    Button,
    MenuItem
} from "@mui/material";

import InputRoundedIcon from "@mui/icons-material/InputRounded";

import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";

import { AuthContext }
from "../context/AuthContext";

import {
    obtenerProductos
} from "../services/productoService";

import {
    registrarEntrada
} from "../services/entradaInventarioService";

//Creación componente 
function EntradaInventario() {

    const { token } =
        useContext(AuthContext);

    const [productos,
        setProductos] =
        useState([]);

    const [productoId,
        setProductoId] =
        useState("");

    const [cantidad,
        setCantidad] =
        useState("");

    const [observacion,
        setObservacion] =
        useState("");
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

    //Registro de entrada
        const guardarEntrada =
    async () => {

        try {

            await registrarEntrada(

                {
                    producto_id:
                        Number(productoId),

                    cantidad:
                        Number(cantidad),

                    observacion
                },

                token
            );

            alert(
                "Entrada registrada"
            );

            setProductoId("");
            setCantidad("");
            setObservacion("");

        } catch (error) {

            console.error(error);

            alert(
                "Error al registrar entrada"
            );
        }
    };

        return (

        <Layout>

            <PageHeader
                titulo="Entrada de Inventario"
                descripcion="Registra el ingreso de stock de un producto"
            />

            <Paper
                sx={{
                    p: 3,
                    maxWidth: 480
                }}
            >

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

                    {productos.map(
                        (producto) => (

                        <MenuItem
                            key={
                                producto.id_producto
                            }
                            value={
                                producto.id_producto
                            }
                        >
                            {producto.nombre}
                        </MenuItem>

                    ))}
                </TextField>

                <TextField
                    label="Cantidad"
                    type="number"
                    value={cantidad}
                    onChange={(e) =>
                        setCantidad(
                            e.target.value
                        )
                    }
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Observación"
                    value={observacion}
                    onChange={(e) =>
                        setObservacion(
                            e.target.value
                        )
                    }
                    fullWidth
                    margin="normal"
                />

                <Button
                    variant="contained"
                    startIcon={<InputRoundedIcon />}
                    onClick={guardarEntrada}
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Registrar Entrada
                </Button>

            </Paper>

        </Layout>
    );
}

export default EntradaInventario;
