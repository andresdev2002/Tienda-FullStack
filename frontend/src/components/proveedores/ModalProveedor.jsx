import {
    useState,
    useEffect
} from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

import {
    crearProveedor,
    actualizarProveedor
} from "../../services/proveedorService";

function ModalProveedor({

    open,

    onClose,

    proveedorEditar,

    cargarProveedores

}) {

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

                    formData
                );

                alert(
                    "Proveedor actualizado"
                );

            } else {

                await crearProveedor(
                    formData
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

            <DialogTitle>

                {proveedorEditar
                    ? "Editar Proveedor"
                    : "Nuevo Proveedor"}

            </DialogTitle>

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

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={guardarProveedor}
                >
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ModalProveedor;