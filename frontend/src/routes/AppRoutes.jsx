import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";
import Clientes from "../pages/Clientes";
import Proveedores from "../pages/Proveedores";
import Ventas from "../pages/Ventas";
import Inventario from "../pages/Inventario";
import EntradaInventario from "../pages/EntradaInventario";
import Kardex from "../pages/Kardex";
import Usuarios from "../pages/Usuarios";

import RutaProtegida from "./RutaProtegida";

// Roles: 1 = Administrador, 2 = Vendedor, 3 = Bodeguero
// (mismos grupos que en Sidebar.jsx, deben coincidir
// con lo que exige cada endpoint en el backend)

function AppRoutes() {

    return (

        <Routes>

            {/* Login */}
            <Route
                path="/"
                element={<Login />}
            />

            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <RutaProtegida rolesPermitidos={[1, 2]}>
                        <Dashboard />
                    </RutaProtegida>
                }
            />

            {/* Productos */}
            <Route
                path="/productos"
                element={
                    <RutaProtegida rolesPermitidos={[1, 2, 3]}>
                        <Productos />
                    </RutaProtegida>
                }
            />

            {/* Clientes */}
            <Route
                path="/clientes"
                element={
                    <RutaProtegida rolesPermitidos={[1, 2]}>
                        <Clientes />
                    </RutaProtegida>
                }
            />

             {/* Proveedores */}

            <Route
                path="/proveedores"
                element={
                    <RutaProtegida rolesPermitidos={[1, 3]}>
                        <Proveedores />
                    </RutaProtegida>
                }
            />
             {/* Ventas */}
            <Route
                path="/ventas"
                element={
                    <RutaProtegida rolesPermitidos={[1, 2]}>
                        <Ventas />
                    </RutaProtegida>
                }
            />

             {/*Inventario */}

            <Route
                path="/inventario"
                element={
                    <RutaProtegida rolesPermitidos={[1, 3]}>
                        <Inventario />
                    </RutaProtegida>
                }
            />
            {/*Registro de entradas */}

            <Route
                path="/entradas"
                element={
                    <RutaProtegida rolesPermitidos={[1, 3]}>
                        <EntradaInventario />
                    </RutaProtegida>
                }
            />

            {/*Kardex*/}
            <Route
                path="/kardex"
                element={
                    <RutaProtegida rolesPermitidos={[1, 3]}>
                        <Kardex />
                    </RutaProtegida>
                }
            />

            {/*Usuarios*/}
            <Route
                path="/usuarios"
                element={
                    <RutaProtegida rolesPermitidos={[1]}>
                        <Usuarios />
                    </RutaProtegida>
                }
            />
            
        </Routes>

    );
}

export default AppRoutes;
