import {
    Typography,
    Paper,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import ToggleOffRoundedIcon from "@mui/icons-material/ToggleOffRounded";

import { useEffect, useState, useContext } from "react";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import TableSearchBar from "../components/common/TableSearchBar";

import ModalUsuario from
"../components/usuarios/ModalUsuario";

import {
    obtenerUsuarios,
    cambiarEstadoUsuario
} from "../services/usuarioService";

import { AuthContext } from "../context/AuthContext";

const NOMBRES_ROL = {
    1: "Administrador",
    2: "Vendedor",
    3: "Bodeguero"
};

function Usuarios() {

    const { token, usuario: usuarioActual } =
        useContext(AuthContext);

    const [usuarios, setUsuarios] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [openModal, setOpenModal] =
        useState(false);

    const [usuarioEditar, setUsuarioEditar] =
        useState(null);

    const [busqueda, setBusqueda] =
        useState("");

    const usuariosFiltrados = usuarios.filter(
        (u) => {

            const texto = busqueda.toLowerCase();

            const rol = NOMBRES_ROL[u.rol_id] || "";

            return (
                u.nombre
                    ?.toLowerCase()
                    .includes(texto) ||

                u.email
                    ?.toLowerCase()
                    .includes(texto) ||

                rol.toLowerCase().includes(texto)
            );
        }
    );

    useEffect(() => {

        cargarUsuarios();

    }, []);

    const cargarUsuarios = async () => {

        try {

            const data =
                await obtenerUsuarios(token);

            setUsuarios(data);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);
        }
    };

    // =========================================
    // EDITAR
    // =========================================

    const handleEditar = (usuario) => {

        setUsuarioEditar(usuario);

        setOpenModal(true);
    };

    // =========================================
    // ACTIVAR / DESACTIVAR
    // =========================================

    const handleCambiarEstado = async (
        idUsuario
    ) => {

        const confirmar = window.confirm(
            "¿Confirmas cambiar el estado de este usuario?"
        );

        if (!confirmar) return;

        try {

            await cambiarEstadoUsuario(
                idUsuario,
                token
            );

            cargarUsuarios();

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.detail ||

                "Error al cambiar el estado"
            );
        }
    };

    return (

        <Layout>

            <PageHeader
                titulo="Usuarios"
                descripcion="Cuentas de acceso al sistema y sus roles"
                accion={
                    <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        onClick={() => {

                            setUsuarioEditar(null);

                            setOpenModal(true);
                        }}
                    >
                        Nuevo Usuario
                    </Button>
                }
            />

            <Paper sx={{ p: 2.5 }}>

                <TableSearchBar
                    value={busqueda}
                    onChange={setBusqueda}
                    placeholder="Buscar por nombre, email o rol..."
                />

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                ID
                            </TableCell>

                            <TableCell>
                                Nombre
                            </TableCell>

                            <TableCell>
                                Email
                            </TableCell>

                            <TableCell>
                                Rol
                            </TableCell>

                            <TableCell>
                                Estado
                            </TableCell>

                            <TableCell>
                                Acciones
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {!cargando &&
                            usuariosFiltrados.length === 0 && (

                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 2 }}
                                    >
                                        {usuarios.length === 0
                                            ? "No hay usuarios registrados todavía."
                                            : "Ningún usuario coincide con la búsqueda."}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {usuariosFiltrados.map((u) => (

                            <TableRow
                                key={u.id_usuario}
                            >

                                <TableCell>
                                    {u.id_usuario}
                                </TableCell>

                                <TableCell>
                                    {u.nombre}
                                </TableCell>

                                <TableCell>
                                    {u.email}
                                </TableCell>

                                <TableCell>
                                    {NOMBRES_ROL[u.rol_id]
                                        || u.rol_id}
                                </TableCell>

                                <TableCell>

                                    <Typography

                                        color={
                                            u.estado
                                                ? "success.main"
                                                : "error"
                                        }

                                    >

                                        {u.estado
                                            ? "ACTIVO"
                                            : "INACTIVO"}

                                    </Typography>

                                </TableCell>

                                <TableCell>

                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={
                                            <EditRoundedIcon fontSize="small" />
                                        }
                                        sx={{ mr: 1 }}
                                        onClick={() =>
                                            handleEditar(u)
                                        }
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        size="small"
                                        color={
                                            u.estado
                                                ? "warning"
                                                : "success"
                                        }
                                        variant="contained"
                                        startIcon={
                                            u.estado
                                                ? <ToggleOffRoundedIcon fontSize="small" />
                                                : <ToggleOnRoundedIcon fontSize="small" />
                                        }
                                        disabled={
                                            u.id_usuario ===
                                            usuarioActual?.id
                                        }
                                        onClick={() =>
                                            handleCambiarEstado(
                                                u.id_usuario
                                            )
                                        }
                                    >
                                        {u.estado
                                            ? "Desactivar"
                                            : "Activar"}
                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </Paper>

            <ModalUsuario
                open={openModal}
                usuarioEditar={usuarioEditar}
                cargarUsuarios={cargarUsuarios}
                onClose={() => {

                    setOpenModal(false);

                    setUsuarioEditar(null);
                }}
            />

        </Layout>
    );
}

export default Usuarios;
