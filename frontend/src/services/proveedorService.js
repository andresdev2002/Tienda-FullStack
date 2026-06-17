import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/proveedores";

// =========================================
// OBTENER PROVEEDORES
// =========================================

export const obtenerProveedores =
    async () => {

        const response =
            await axios.get(API_URL);

        return response.data;
    };

// =========================================
// CREAR PROVEEDOR
// =========================================

export const crearProveedor =
    async (datos) => {

        const response =
            await axios.post(
                API_URL,
                datos
            );

        return response.data;
    };

// =========================================
// ACTUALIZAR PROVEEDOR
// =========================================

export const actualizarProveedor =
    async (id, datos) => {

        const response =
            await axios.put(
                `${API_URL}/${id}`,
                datos
            );

        return response.data;
    };

// =========================================
// ELIMINAR PROVEEDOR
// =========================================

export const eliminarProveedor =
    async (id) => {

        const response =
            await axios.delete(
                `${API_URL}/${id}`
            );

        return response.data;
    };