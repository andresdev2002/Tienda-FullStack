import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";
import Clientes from "../pages/Clientes";
import Proveedores from "../pages/Proveedores";
import Ventas from "../pages/Ventas";
import Inventario from "../pages/Inventario";

function AppRoutes() {
    return (
        <Routes>

        <Route
            path="/"
            element={<Dashboard />}
        />

        <Route
            path="/dashboard"
            element={<Dashboard />}
        />

        <Route
            path="/productos"
            element={<Productos />}
        />

        <Route
            path="/clientes"
            element={<Clientes />}
        />

        <Route
            path="/proveedores"
            element={<Proveedores />}
        />

        <Route
            path="/ventas"
            element={<Ventas />}
        />

        <Route
            path="/inventario"
            element={<Inventario />}
        />

        </Routes>
    );
    }

export default AppRoutes;