import axios from "axios";

const API_URL = "http://127.0.0.1:8000/usuarios";

// =========================================
// OBTENER USUARIOS
// =========================================

export const obtenerUsuarios = async (
    token
) => {

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// CREAR USUARIO
// =========================================

export const crearUsuario = async (
    usuario,
    token
) => {

    const response = await axios.post(

        API_URL,

        usuario,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// ACTUALIZAR USUARIO
// =========================================

export const actualizarUsuario = async (
    id,
    usuario,
    token
) => {

    const response = await axios.put(

        `${API_URL}/${id}`,

        usuario,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// ACTIVAR / DESACTIVAR USUARIO
// =========================================

export const cambiarEstadoUsuario = async (
    id,
    token
) => {

    const response = await axios.patch(

        `${API_URL}/${id}/estado`,

        {},

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
