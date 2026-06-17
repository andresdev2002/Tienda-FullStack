import {
    useState,
    useEffect,
    useContext
} from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    DialogActions
} from "@mui/material";

import { AuthContext } from "../../context/AuthContext";

import {
    crearProducto,
    actualizarProducto
} from "../../services/productoService";

function ModalProducto({

    open,

    onClose,

    productoEditar,

    cargarProductos

}) {

    const { token } = useContext(
        AuthContext
    );

    // =========================================
    // ESTADO INICIAL
    // =========================================

    const estadoInicial = {

        nombre: "",

        descripcion: "",

        categoria_id: 1,

        proveedor_id: 1,

        sku: "",

        codigo_barras: "",

        precio_compra: 0,

        precio_venta: 0,

        stock_actual: 0,

        stock_minimo: 0,

        stock_maximo: 0,

        unidad_medida: "Unidad",

        estado: "ACTIVO",

        imagen_url: ""
    };

    // =========================================
    // FORMULARIO
    // =========================================

    const [formData, setFormData] =
        useState(estadoInicial);

    // =========================================
    // CARGAR DATOS SI ES EDICIÓN
    // =========================================

    useEffect(() => {

        if (productoEditar) {

            setFormData(productoEditar);

        } else {

            setFormData(
                estadoInicial
            );
        }

    }, [productoEditar]);

    // =========================================
    // ACTUALIZAR CAMPOS
    // =========================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });
    };

    // =========================================
    // GUARDAR
    // =========================================

    const guardarProducto = async () => {

        try {

            if (productoEditar) {

                await actualizarProducto(

                    productoEditar.id_producto,

                    formData,

                    token
                );

                alert(
                    "Producto actualizado correctamente"
                );

            } else {

                await crearProducto(

                    formData,

                    token
                );

                alert(
                    "Producto creado correctamente"
                );
            }

            cargarProductos();

            onClose();

        } catch (error) {

            console.error(error);

            alert(
                "Error al guardar producto"
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

                {productoEditar
                    ? "Editar Producto"
                    : "Nuevo Producto"}

            </DialogTitle>

            <DialogContent>

                {/* Nombre */}

                <TextField
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Descripción */}

                <TextField
                    label="Descripción"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Precio Compra */}

                <TextField
                    label="Precio Compra"
                    name="precio_compra"
                    type="number"
                    value={formData.precio_compra}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Precio Venta */}

                <TextField
                    label="Precio Venta"
                    name="precio_venta"
                    type="number"
                    value={formData.precio_venta}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Stock Actual */}

                <TextField
                    label="Stock Actual"
                    name="stock_actual"
                    type="number"
                    value={formData.stock_actual}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Stock Mínimo */}

                <TextField
                    label="Stock Mínimo"
                    name="stock_minimo"
                    type="number"
                    value={formData.stock_minimo}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Stock Máximo */}

                <TextField
                    label="Stock Máximo"
                    name="stock_maximo"
                    type="number"
                    value={formData.stock_maximo}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Categoría */}

                <TextField
                    label="Categoría ID"
                    name="categoria_id"
                    type="number"
                    value={formData.categoria_id}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* Proveedor */}

                <TextField
                    label="Proveedor ID"
                    name="proveedor_id"
                    type="number"
                    value={formData.proveedor_id}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={guardarProducto}
                >
                    {productoEditar
                        ? "Actualizar"
                        : "Guardar"}
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ModalProducto;