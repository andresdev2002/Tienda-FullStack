import { createTheme } from "@mui/material/styles";

// =========================================
// PALETA DE COLORES
// =========================================
// Inspirada en Linear / Stripe / Vercel / GitHub:
// fondo gris-azulado muy claro (no blanco puro),
// bordes finos en vez de sombras pesadas, un solo
// acento azul usado con moderación.

const palette = {

    light: {
        mode: "light",

        primary: {
            main: "#2563EB",
            dark: "#1D4ED8",
            light: "#3B82F6",
            contrastText: "#FFFFFF"
        },

        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF"
        },

        text: {
            primary: "#0F172A",
            secondary: "#64748B"
        },

        divider: "#E2E8F0",

        success: { main: "#16A34A" },
        error: { main: "#DC2626" },
        warning: { main: "#D97706" },
        info: { main: "#0891B2" }
    },

    dark: {
        mode: "dark",

        primary: {
            main: "#3B82F6",
            dark: "#2563EB",
            light: "#60A5FA",
            contrastText: "#FFFFFF"
        },

        background: {
            default: "#0B1120",
            paper: "#141B2D"
        },

        text: {
            primary: "#F1F5F9",
            secondary: "#94A3B8"
        },

        divider: "#1F2A3D",

        success: { main: "#22C55E" },
        error: { main: "#EF4444" },
        warning: { main: "#F59E0B" },
        info: { main: "#22D3EE" }
    }
};

// =========================================
// CREAR TEMA
// =========================================

export function crearTema(modo) {

    const colores = modo === "dark"
        ? palette.dark
        : palette.light;

    return createTheme({

        palette: colores,

        shape: {
            borderRadius: 10
        },

        typography: {
            fontFamily:
                '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

            h4: {
                fontWeight: 700,
                letterSpacing: "-0.02em"
            },

            h5: {
                fontWeight: 700,
                letterSpacing: "-0.01em"
            },

            h6: {
                fontWeight: 600
            },

            subtitle2: {
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.7rem",
                letterSpacing: "0.06em"
            },

            button: {
                fontWeight: 600,
                textTransform: "none"
            }
        },

        components: {

            // =========================================
            // BOTONES
            // =========================================

            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 16,
                        paddingRight: 16,
                        boxShadow: "none",
                        transition:
                            "background-color 0.15s ease, " +
                            "border-color 0.15s ease, " +
                            "transform 0.1s ease",

                        "&:hover": {
                            boxShadow: "none"
                        },

                        "&:active": {
                            transform: "scale(0.98)"
                        }
                    },

                    containedPrimary: {
                        "&:hover": {
                            backgroundColor:
                                colores.primary.dark
                        }
                    },

                    outlined: {
                        borderColor: colores.divider
                    }
                }
            },

            // =========================================
            // CARDS / PAPER
            // =========================================

            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none"
                    }
                }
            },

            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,
                        border: `1px solid ${colores.divider}`,
                        boxShadow:
                            modo === "dark"
                                ? "none"
                                : "0 1px 2px rgba(15, 23, 42, 0.04)",
                        transition:
                            "box-shadow 0.2s ease, " +
                            "transform 0.2s ease"
                    }
                }
            },

            // =========================================
            // INPUTS
            // =========================================

            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,

                        "& fieldset": {
                            borderColor: colores.divider
                        },

                        "&:hover fieldset": {
                            borderColor:
                                colores.primary.main
                        }
                    }
                }
            },

            MuiTextField: {
                defaultProps: {
                    size: "small"
                }
            },

            // =========================================
            // TABLAS
            // =========================================

            MuiTableHead: {
                styleOverrides: {
                    root: {
                        "& .MuiTableCell-root": {
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            color: colores.text.secondary,
                            borderBottom:
                                `1px solid ${colores.divider}`
                        }
                    }
                }
            },

            MuiTableRow: {
                styleOverrides: {
                    root: {
                        "&:hover": {
                            backgroundColor:
                                modo === "dark"
                                    ? "rgba(255,255,255,0.03)"
                                    : "rgba(15, 23, 42, 0.025)"
                        }
                    }
                }
            },

            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom:
                            `1px solid ${colores.divider}`
                    }
                }
            },

            // =========================================
            // MODALES
            // =========================================

            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 16,
                        border: `1px solid ${colores.divider}`
                    }
                }
            },

            // =========================================
            // CHIPS / ALERTAS
            // =========================================

            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        fontWeight: 600
                    }
                }
            },

            MuiAlert: {
                styleOverrides: {
                    root: {
                        borderRadius: 10
                    }
                }
            },

            // =========================================
            // FOCO VISIBLE (accesibilidad)
            // =========================================

            MuiButtonBase: {
                defaultProps: {
                    disableRipple: false
                },
                styleOverrides: {
                    root: {
                        "&.Mui-focusVisible": {
                            outline:
                                `2px solid ${colores.primary.main}`,
                            outlineOffset: "2px"
                        }
                    }
                }
            }
        }
    });
}
