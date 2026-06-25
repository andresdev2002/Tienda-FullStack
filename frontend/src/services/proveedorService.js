import axios from "axios";

const API_URL = "http://127.0.0.1:8000/proveedores";

// =========================================
// OBTENER PROVEEDORES
// =========================================

export const obtenerProveedores = async (
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
// CREAR PROVEEDOR
// =========================================

export const crearProveedor = async (
    proveedor,
    token
) => {

    const response = await axios.post(
        API_URL,
        proveedor,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// ACTUALIZAR PROVEEDOR
// =========================================

export const actualizarProveedor = async (
    id,
    proveedor,
    token
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        proveedor,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// ELIMINAR PROVEEDOR
// =========================================

export const eliminarProveedor = async (
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
