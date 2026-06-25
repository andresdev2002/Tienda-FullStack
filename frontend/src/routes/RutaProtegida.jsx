import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

// =========================================
// RUTA PROTEGIDA
// =========================================
// - Si no hay token: redirige a /login (no se
//   puede ni intentar cargar la pantalla).
// - Si hay token pero el rol no está en
//   "rolesPermitidos": redirige a /productos,
//   que es el único módulo que SÍ pueden ver
//   los 3 roles. Si esto redirigiera a /dashboard
//   y el rol tampoco pudiera verlo (caso
//   Bodeguero), se forma un loop infinito de
//   redirección y la pantalla queda en blanco.
// - Si no se pasa "rolesPermitidos", solo exige
//   estar logueado (cualquier rol entra).

function RutaProtegida({

    children,

    rolesPermitidos

}) {

    const { token, usuario } =
        useContext(AuthContext);

    if (!token) {

        return <Navigate to="/" replace />;
    }

    if (
        rolesPermitidos &&
        !rolesPermitidos.includes(usuario?.rol_id)
    ) {

        return (
            <Navigate to="/productos" replace />
        );
    }

    return children;
}

export default RutaProtegida;
