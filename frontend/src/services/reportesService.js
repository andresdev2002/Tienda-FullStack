import axios from "axios";

const API_URL = "http://127.0.0.1:8000/reportes";

// =========================================
// GANANCIAS TOTALES
// =========================================

export const obtenerGanancias = async (
    token
) => {

    const response = await axios.get(
        `${API_URL}/ganancias`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// MOVIMIENTOS DE INVENTARIO
// =========================================

export const obtenerMovimientos = async (
    token
) => {

    const response = await axios.get(
        `${API_URL}/movimientos`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
