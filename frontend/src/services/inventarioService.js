import axios from "axios";

const API_URL = "http://127.0.0.1:8000/inventario";

// =========================================
// OBTENER MOVIMIENTOS
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