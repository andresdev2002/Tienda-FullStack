import axios from "axios";

const API_URL = "http://127.0.0.1:8000/productos";

// =========================================
// OBTENER PRODUCTOS
// =========================================

export const obtenerProductos = async () => {

  const response = await axios.get(API_URL);

  return response.data;
};

// =========================================
// CREAR PRODUCTO
// =========================================

export const crearProducto = async (producto) => {

  const response = await axios.post(
    API_URL,
    producto
  );

  return response.data;
};