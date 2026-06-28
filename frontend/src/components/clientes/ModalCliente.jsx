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
    crearCliente,
    actualizarCliente
} from "../../services/clienteService";

import { AuthContext } from "../../context/AuthContext";

function ModalCliente({

    open,

    onClose,

    clienteEditar,

    cargarClientes

}) {

    const { token } = useContext(AuthContext);

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

                    formData,

                    token
                );

                alert(
                    "Cliente actualizado"
                );

            } else {

                await crearCliente(
                    formData,
                    token
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

            <DialogTitle sx={{ fontWeight: 700 }}>

                {clienteEditar
                    ? "Editar Cliente"
                    : "Nuevo Cliente"}

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
                    onClick={guardarCliente}
                >
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ModalCliente;