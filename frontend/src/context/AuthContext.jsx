import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    // =========================================
    // TOKEN
    // =========================================

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    // =========================================
    // USUARIO
    // =========================================

    const [usuario, setUsuario] = useState(

        JSON.parse(
            localStorage.getItem("usuario")
        )
    );

    // =========================================
    // GUARDAR SESIÓN
    // =========================================

    const guardarSesion = (

        nuevoToken,

        nuevoUsuario

    ) => {

        localStorage.setItem(
            "token",
            nuevoToken
        );

        localStorage.setItem(
            "usuario",
            JSON.stringify(nuevoUsuario)
        );

        setToken(nuevoToken);

        setUsuario(nuevoUsuario);
    };

    // =========================================
    // LOGOUT
    // =========================================

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "usuario"
        );

        setToken(null);

        setUsuario(null);
    };

    return (

        <AuthContext.Provider
            value={{

                token,

                usuario,

                guardarSesion,

                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}