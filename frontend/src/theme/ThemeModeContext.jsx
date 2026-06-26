import {
    createContext,
    useState,
    useMemo
} from "react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { crearTema } from "./theme";

export const ThemeModeContext = createContext();

export function ThemeModeProvider({ children }) {

    // =========================================
    // MODO (claro / oscuro)
    // =========================================
    // Se guarda solo en localStorage del navegador,
    // no es una preferencia del backend.

    const [modo, setModo] = useState(

        localStorage.getItem("modo_tema") || "light"
    );

    const alternarModo = () => {

        const nuevoModo =
            modo === "light" ? "dark" : "light";

        localStorage.setItem(
            "modo_tema",
            nuevoModo
        );

        setModo(nuevoModo);
    };

    const tema = useMemo(
        () => crearTema(modo),
        [modo]
    );

    return (

        <ThemeModeContext.Provider
            value={{ modo, alternarModo }}
        >

            <ThemeProvider theme={tema}>

                <CssBaseline />

                {children}

            </ThemeProvider>

        </ThemeModeContext.Provider>
    );
}
