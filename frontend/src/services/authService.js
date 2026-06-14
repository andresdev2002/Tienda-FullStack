import axios from "axios";

const API_URL = "http://127.0.0.1:8000/usuarios";

// =========================================
// LOGIN
// =========================================

export const login = async (

    email,

    password

) => {

    const response = await axios.post(

        `${API_URL}/login`,

        {
            email,
            password
        }

    );

    return response.data;
};

// =========================================
// PERFIL
// =========================================

export const obtenerPerfil = async (

    token

) => {

    const response = await axios.get(

        `${API_URL}/perfil`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;
};