import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";

function AppRoutes() {

    return (

        <Routes>

        <Route
            path="/"
            element={<Login />}
        />

        <Route
            path="/dashboard"
            element={<Dashboard />}
        />

        <Route
            path="/productos"
            element={<Productos />}
        />

        </Routes>

    );
    }

export default AppRoutes;