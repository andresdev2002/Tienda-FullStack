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
    MenuItem,
    Button
} from "@mui/material";

import {
    crearUsuario,
    actualizarUsuario
} from "../../services/usuarioService";

import { AuthContext } from "../../context/AuthContext";

// =========================================
// ROLES DISPONIBLES
// =========================================
// Coinciden con los id_rol fijos sembrados en la
// tabla "roles" (1, 2, 3). Si llegas a agregar
// más roles desde la base de datos, esto habría
// que moverlo a un endpoint GET /roles.

const ROLES = [
    { id: 1, nombre: "Administrador" },
    { id: 2, nombre: "Vendedor" },
    { id: 3, nombre: "Bodeguero" }
];

function ModalUsuario({

    open,

    onClose,

    usuarioEditar,

    cargarUsuarios

}) {

    const { token } = useContext(AuthContext);

    // =========================================
    // ESTADO FORMULARIO
    // =========================================

    const [formData, setFormData] =
        useState({

            nombre: "",

            email: "",

            password: "",

            rol_id: 2
        });

    // =========================================
    // CARGAR DATOS PARA EDITAR
    // =========================================

    useEffect(() => {

        if (usuarioEditar) {

            setFormData({

                nombre:
                    usuarioEditar.nombre || "",

                email:
                    usuarioEditar.email || "",

                password: "",

                rol_id:
                    usuarioEditar.rol_id || 2
            });

        } else {

            setFormData({

                nombre: "",

                email: "",

                password: "",

                rol_id: 2
            });
        }

    }, [usuarioEditar, open]);

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

    const guardarUsuario = async () => {

        try {

            if (usuarioEditar) {

                // La edición solo manda nombre,
                // email y rol_id (sin password,
                // el backend tampoco lo acepta aquí)

                await actualizarUsuario(

                    usuarioEditar.id_usuario,

                    {
                        nombre: formData.nombre,
                        email: formData.email,
                        rol_id: formData.rol_id
                    },

                    token
                );

                alert(
                    "Usuario actualizado"
                );

            } else {

                await crearUsuario(
                    formData,
                    token
                );

                alert(
                    "Usuario creado"
                );
            }

            cargarUsuarios();

            onClose();

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.detail ||

                "Error al guardar usuario"
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

                {usuarioEditar
                    ? "Editar Usuario"
                    : "Nuevo Usuario"}

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
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* La contraseña solo se pide al
                    crear. Cambiarla después debería
                    ser su propio flujo (ej. "resetear
                    contraseña"), no parte de editar
                    nombre/email/rol. */}

                {!usuarioEditar && (

                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                )}

                <TextField
                    select
                    label="Rol"
                    name="rol_id"
                    value={formData.rol_id}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >

                    {ROLES.map((rol) => (

                        <MenuItem
                            key={rol.id}
                            value={rol.id}
                        >
                            {rol.nombre}
                        </MenuItem>
                    ))}

                </TextField>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={guardarUsuario}
                >
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ModalUsuario;
