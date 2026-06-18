import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/inventario";

export const registrarEntrada = async (
    datos,
    token
) => {

    const response = await axios.post(

        `${API_URL}/entrada`,

        datos,

        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};