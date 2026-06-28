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
    DialogActions,
    Grid,
    Divider
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

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

    }, [productoEditar, open]);

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

            <DialogTitle sx={{ fontWeight: 700 }}>

                {productoEditar
                    ? "Editar Producto"
                    : "Nuevo Producto"}

            </DialogTitle>

            <Divider />

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 0.5 }}>

                    {/* Nombre */}

                    <Grid xs={12} md={8}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Unidad de medida */}

                    <Grid xs={12} md={4}>
                        <TextField
                            label="Unidad de Medida"
                            name="unidad_medida"
                            value={formData.unidad_medida}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Descripción */}

                    <Grid xs={12}>
                        <TextField
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            minRows={2}
                        />
                    </Grid>

                    {/* Precio Compra */}

                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Precio Compra"
                            name="precio_compra"
                            type="number"
                            value={formData.precio_compra}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Precio Venta */}

                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Precio Venta"
                            name="precio_venta"
                            type="number"
                            value={formData.precio_venta}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Stock Actual */}

                    <Grid xs={12} sm={4}>
                        <TextField
                            label="Stock Actual"
                            name="stock_actual"
                            type="number"
                            value={formData.stock_actual}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Stock Mínimo */}

                    <Grid xs={12} sm={4}>
                        <TextField
                            label="Stock Mínimo"
                            name="stock_minimo"
                            type="number"
                            value={formData.stock_minimo}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Stock Máximo */}

                    <Grid xs={12} sm={4}>
                        <TextField
                            label="Stock Máximo"
                            name="stock_maximo"
                            type="number"
                            value={formData.stock_maximo}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Categoría */}

                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Categoría ID"
                            name="categoria_id"
                            type="number"
                            value={formData.categoria_id}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Proveedor */}

                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Proveedor ID"
                            name="proveedor_id"
                            type="number"
                            value={formData.proveedor_id}
                            onChange={handleChange}
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
                    startIcon={<SaveRoundedIcon />}
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
