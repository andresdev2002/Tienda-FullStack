import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";

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
            await obtenerClientes();

        const productosData =
            await obtenerProductos();

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
        console.log("TOKEN:", token);
        console.log("USUARIO:", localStorage.getItem("usuario"));
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
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                Nueva Venta

            </DialogTitle>

            <DialogContent>

                {/* Cliente */}

                <TextField
                    select
                    label="Cliente"
                    value={clienteId}
                    onChange={(e) =>
                        setClienteId(e.target.value)
                    }
                    fullWidth
                    margin="normal"
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

                {/* Método de pago */}

                <TextField
                            select
                            label="Método Pago"
                            value={metodoPago}
                            onChange={(e) =>
                                setMetodoPago(e.target.value)
                            }
                            fullWidth
                            margin="normal"
                        >

                            <MenuItem value="EFECTIVO">
                                EFECTIVO
                            </MenuItem>

                            <MenuItem value="TARJETA">
                            TARJETA
                            </MenuItem>

                            <MenuItem value="TRANSFERENCIA">
                            TRANSFERENCIA
                            </MenuItem>

                            <MenuItem value="NEQUI">
                            NEQUI
                            </MenuItem>

                </TextField>

                {/* Producto */}

                <TextField
                        select
                        label="Producto"
                        value={productoId}
                        onChange={(e) =>
                            setProductoId(e.target.value)
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

                {/* Cantidad */}

                <TextField
                    label="Cantidad"
                    type="number"
                    value={cantidad}
                    onChange={(e) =>
                        setCantidad(e.target.value)
                    }
                    fullWidth
                    margin="normal"
                />

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={guardarVenta}
                >
                    Guardar Venta
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ModalVenta;