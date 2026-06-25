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

import { useEffect, useState, useContext } from "react";

import Layout from "../components/layout/Layout";

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

    const [openModal, setOpenModal] =
        useState(false);

    const [usuarioEditar, setUsuarioEditar] =
        useState(null);

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

            <Paper sx={{ p: 2 }}>

                <Button
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => {

                        setUsuarioEditar(null);

                        setOpenModal(true);
                    }}
                >
                    Nuevo Usuario
                </Button>

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

                        {usuarios.map((u) => (

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
