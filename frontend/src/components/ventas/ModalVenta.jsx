import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Divider
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";

import { useEffect, useState } from "react";

import {
    obtenerClientes
} from "../../services/clienteService";

import {
    obtenerProductos
} from "../../services/productoService";

import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import {
    crearVenta
} from "../../services/ventaService";

function ModalVenta({

    open,

    onClose

}) { 

    const { token } = useContext(
    AuthContext
);

    // =========================================
// LISTAS
// =========================================

const [clientes, setClientes] =
    useState([]);

const [productos, setProductos] =
    useState([]);


// =========================================
// FORMULARIO
// =========================================

const [clienteId, setClienteId] =
    useState("");

const [metodoPago, setMetodoPago] =
    useState("EFECTIVO");

const [productoId, setProductoId] =
    useState("");

const [cantidad, setCantidad] =
    useState(1);

    //Cargar datos

    useEffect(() => {

    cargarDatos();

}, []);

const cargarDatos = async () => {

    try {

        const clientesData =
            await obtenerClientes(token);

        const productosData =
            await obtenerProductos(token);

        setClientes(clientesData);

        setProductos(productosData);

    } catch (error) {

        console.error(error);
    }
};

//GUARDAR VENTA
    const guardarVenta = async () => {

    try {

        const venta = {

            cliente_id: Number(clienteId),

            metodo_pago: metodoPago,

            detalles: [
                {
                    producto_id: Number(productoId),
                    cantidad: Number(cantidad)
                }
            ]
        };

        await crearVenta(
            venta,
            token
        );

        alert(
            "Venta creada correctamente"
        );

        onClose();

    } catch (error) {

        console.error(error);

        alert(
            "Error al crear la venta"
        );
    }
};

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle sx={{ fontWeight: 700 }}>

                Nueva Venta

            </DialogTitle>

            <Divider />

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 0.5 }}>

                    {/* Cliente */}

                    <Grid xs={12} sm={6}>

                        <TextField
                            select
                            label="Cliente"
                            value={clienteId}
                            onChange={(e) =>
                                setClienteId(e.target.value)
                            }
                            fullWidth
                        >
                                <MenuItem value="">
                                    Seleccione
                                </MenuItem>

                            {clientes.map(cliente => (

                                <MenuItem
                                    key={cliente.id_cliente}
                                    value={cliente.id_cliente}
                                >
                                    {cliente.nombre}
                                </MenuItem>
                            ))}

                        </TextField>

                    </Grid>

                    {/* Método de pago */}

                    <Grid xs={12} sm={6}>

                        <TextField
                                    select
                                    label="Método Pago"
                                    value={metodoPago}
                                    onChange={(e) =>
                                        setMetodoPago(e.target.value)
                                    }
                                    fullWidth
                                >

                                    <MenuItem value="EFECTIVO">
                                        Efectivo
                                    </MenuItem>

                                    <MenuItem value="TARJETA">
                                    Tarjeta
                                    </MenuItem>

                                    <MenuItem value="TRANSFERENCIA">
                                    Transferencia
                                    </MenuItem>

                                    <MenuItem value="NEQUI">
                                    Nequi
                                    </MenuItem>

                        </TextField>

                    </Grid>

                    {/* Producto */}

                    <Grid xs={12} sm={8}>

                        <TextField
                                select
                                label="Producto"
                                value={productoId}
                                onChange={(e) =>
                                    setProductoId(e.target.value)
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

                    </Grid>

                    {/* Cantidad */}

                    <Grid xs={12} sm={4}>

                        <TextField
                            label="Cantidad"
                            type="number"
                            value={cantidad}
                            onChange={(e) =>
                                setCantidad(e.target.value)
                            }
                            fullWidth
                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <Divider />

            <DialogActions sx={{ p: 2 }}>

                <Button
                    onClick={onClose}
                    startIcon={<CloseRoundedIcon />}
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    startIcon={<PointOfSaleRoundedIcon />}
                    onClick={guardarVenta}
                >
                    Guardar Venta
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ModalVenta;
