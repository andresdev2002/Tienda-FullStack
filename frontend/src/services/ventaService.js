import axios from "axios";

const API_URL = "http://127.0.0.1:8000/ventas";

// =========================================
// OBTENER VENTAS
// =========================================

export const obtenerVentas = async () => {

    const response = await axios.get(API_URL);

    return response.data;
};

// =========================================
// CREAR VENTA
// =========================================

export const crearVenta = async (venta, token) => {

    const response = await axios.post(

        API_URL,

        venta,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};