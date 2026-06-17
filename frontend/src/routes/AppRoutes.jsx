import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";
import Clientes from "../pages/Clientes";
import Proveedores from "../pages/Proveedores";
import Ventas from "../pages/Ventas";

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
                element={<Dashboard />}
            />

            {/* Productos */}
            <Route
                path="/productos"
                element={<Productos />}
            />

            {/* Clientes */}
            <Route
                path="/clientes"
                element={<Clientes />}
            />

             {/* Proveedores */}

            <Route
                path="/proveedores"
                element={<Proveedores />}
            />
             {/* Ventas */}
            <Route
                path="/ventas"
                element={<Ventas />}
            />

        </Routes>

            

    );
}

export default AppRoutes;