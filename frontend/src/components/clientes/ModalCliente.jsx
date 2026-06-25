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
    crearCliente,
    actualizarCliente
} from "../../services/clienteService";

function ModalCliente({

    open,

    onClose,

    clienteEditar,

    cargarClientes

}) {

    // =========================================
    // ESTADO FORMULARIO
    // =========================================

    const [formData, setFormData] =
        useState({

            nombre: "",

            telefono: "",

            email: ""
        });

    // =========================================
    // CARGAR DATOS PARA EDITAR
    // =========================================

    useEffect(() => {

        if (clienteEditar) {

            setFormData({

                nombre:
                    clienteEditar.nombre || "",

                telefono:
                    clienteEditar.telefono || "",

                email:
                    clienteEditar.email || ""
            });

        } else {

            setFormData({

                nombre: "",

                telefono: "",

                email: ""
            });
        }

    }, [clienteEditar, open]);

    // =========================================
    // CAMBIOS INPUTS
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

    const guardarCliente = async () => {

        try {

            if (clienteEditar) {

                await actualizarCliente(

                    clienteEditar.id_cliente,

                    formData
                );

                alert(
                    "Cliente actualizado"
                );

            } else {

                await crearCliente(
                    formData
                );

                alert(
                    "Cliente creado"
                );
            }

            cargarClientes();

            onClose();

        } catch (error) {

            console.error(error);

            alert(
                "Error al guardar cliente"
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

                {clienteEditar
                    ? "Editar Cliente"
                    : "Nuevo Cliente"}

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
                    onClick={guardarCliente}
                >
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ModalCliente;