import axios from "axios";

const API_URL = "http://127.0.0.1:8000/productos";

// =========================================
// OBTENER PRODUCTOS
// =========================================

export const obtenerProductos = async (
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
// CREAR PRODUCTO
// =========================================

export const crearProducto = async (
    producto,
    token
) => {

    const response = await axios.post(

        API_URL,

        producto,

        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// ACTUALIZAR PRODUCTO
// =========================================

export const actualizarProducto = async (
    id,
    datos,
    token
) => {

    const response = await axios.put(

        `${API_URL}/${id}`,

        datos,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// =========================================
// ELIMINAR PRODUCTO
// =========================================

export const eliminarProducto = async (
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