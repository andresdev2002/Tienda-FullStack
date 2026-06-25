import axios from "axios";

const API_URL = "http://127.0.0.1:8000/clientes";

// =========================================
// OBTENER CLIENTES
// =========================================

export const obtenerClientes = async (
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
// CREAR CLIENTE
// =========================================

export const crearCliente = async (
    cliente,
    token
) => {

    const response = await axios.post(
        API_URL,
        cliente,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// ACTUALIZAR CLIENTE
// =========================================

export const actualizarCliente = async (
    id,
    cliente,
    token
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        cliente,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// ELIMINAR CLIENTE
// =========================================

export const eliminarCliente = async (
    id,
    token
) => {

    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
