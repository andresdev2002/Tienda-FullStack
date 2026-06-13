import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(

        localStorage.getItem("token")
    );

    // =========================================
    // GUARDAR TOKEN
    // =========================================

    const guardarToken = (nuevoToken) => {

        localStorage.setItem(
        "token",
        nuevoToken
        );

        setToken(nuevoToken);
    };

    // =========================================
    // LOGOUT
    // =========================================

    const logout = () => {

        localStorage.removeItem(
        "token"
        );

        setToken(null);
    };

    return (

        <AuthContext.Provider
        value={{
            token,
            guardarToken,
            logout
        }}
        >

        {children}

        </AuthContext.Provider>
    );
}