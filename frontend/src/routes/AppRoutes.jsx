import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";
import Clientes from "../pages/Clientes";

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

        </Routes>

    );
}

export default AppRoutes;