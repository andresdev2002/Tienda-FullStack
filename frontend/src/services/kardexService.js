import axios from "axios";

const API_URL = "http://127.0.0.1:8000/inventario";

export const obtenerKardex = async (
    idProducto,
    token
) => {

    const response = await axios.get(

        `${API_URL}/kardex/${idProducto}`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};