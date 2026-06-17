import axios from "axios";

const API_URL = "http://127.0.0.1:8000/clientes";

// =========================================
// OBTENER CLIENTES
// =========================================

export const obtenerClientes = async () => {

    const response = await axios.get(
        API_URL
    );

    return response.data;
};

// =========================================
// CREAR CLIENTE
// =========================================

export const crearCliente = async (
    cliente
) => {

    const response = await axios.post(
        API_URL,
        cliente
    );

    return response.data;
};

// =========================================
// ACTUALIZAR CLIENTE
// =========================================

export const actualizarCliente = async (
    id,
    cliente
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        cliente
    );

    return response.data;
};

// =========================================
// ELIMINAR CLIENTE
// =========================================

export const eliminarCliente = async (
    id
) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};