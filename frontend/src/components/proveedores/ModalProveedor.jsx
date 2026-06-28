import {
    useState,
    useEffect,
    useContext
} from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Divider
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import {
    crearProveedor,
    actualizarProveedor
} from "../../services/proveedorService";

import { AuthContext } from "../../context/AuthContext";

function ModalProveedor({

    open,

    onClose,

    proveedorEditar,

    cargarProveedores

}) {

    const { token } = useContext(AuthContext);

    // =========================================
    // FORMULARIO
    // =========================================

    const [formData, setFormData] =
        useState({

            nombre: "",

            contacto: "",

            telefono: "",

            email: ""
        });

    // =========================================
    // CARGAR DATOS PARA EDITAR
    // =========================================

    useEffect(() => {

        if (proveedorEditar) {

            setFormData({

                nombre:
                    proveedorEditar.nombre || "",

                contacto:
                    proveedorEditar.contacto || "",

                telefono:
                    proveedorEditar.telefono || "",

                email:
                    proveedorEditar.email || ""
            });

        } else {

            setFormData({

                nombre: "",

                contacto: "",

                telefono: "",

                email: ""
            });
        }

    }, [proveedorEditar, open]);

    // =========================================
    // ACTUALIZAR INPUTS
    // =========================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    // =========================================
    // GUARDAR
    // =========================================

    const guardarProveedor =
        async () => {

        try {

            if (proveedorEditar) {

                await actualizarProveedor(

                    proveedorEditar.id_proveedor,

                    formData,

                    token
                );

                alert(
                    "Proveedor actualizado"
                );

            } else {

                await crearProveedor(
                    formData,
                    token
                );

                alert(
                    "Proveedor creado"
                );
            }

            cargarProveedores();

            onClose();

        } catch (error) {

            console.error(error);

            alert(
                "Error al guardar proveedor"
            );
        }
    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle sx={{ fontWeight: 700 }}>

                {proveedorEditar
                    ? "Editar Proveedor"
                    : "Nuevo Proveedor"}

            </DialogTitle>

            <Divider />

            <DialogContent>

                <TextField
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Contacto"
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

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
                    onClick={guardarProveedor}
                >
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ModalProveedor;