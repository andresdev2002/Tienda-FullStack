import { useContext } from "react";

import { Link, useLocation } from "react-router-dom";

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Divider
} from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import { menuItems } from "../../config/navigation";

const ANCHO_SIDEBAR = 248;

function Sidebar({ mobileOpen, onClose }) {

    const { usuario } = useContext(AuthContext);

    const location = useLocation();

    // Cada item del menú declara qué roles pueden
    // verlo. Esto refleja la matriz de permisos del
    // backend; si un módulo no aparece aquí para un
    // rol, tampoco debería estar accesible por API.

    const items = menuItems.filter((item) =>
        item.roles.includes(usuario?.rol_id)
    );

    const contenido = (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}
        >

            <Box sx={{ px: 3, py: 3 }}>

                <Typography
                    variant="h6"
                    sx={{ fontWeight: 800 }}
                >
                    Sistema Inventario
                </Typography>

            </Box>

            <Divider />

            <List sx={{ flexGrow: 1, px: 2, py: 2 }}>

                {items.map((item) => {

                    const activo =
                        location.pathname === item.ruta;

                    const Icono = item.icono;

                    return (

                        <ListItem
                            key={item.texto}
                            disablePadding
                            sx={{ mb: 0.5 }}
                        >
                            <ListItemButton
                                component={Link}
                                to={item.ruta}
                                onClick={onClose}
                                selected={activo}
                                sx={{
                                    borderRadius: 2,
                                    py: 1,

                                    "&.Mui-selected": {
                                        backgroundColor:
                                            "primary.main",

                                        color:
                                            "primary.contrastText",

                                        "&:hover": {
                                            backgroundColor:
                                                "primary.dark"
                                        },

                                        "& .MuiListItemIcon-root": {
                                            color:
                                                "primary.contrastText"
                                        }
                                    },

                                    "&:hover": {
                                        backgroundColor: activo
                                            ? undefined
                                            : "action.hover"
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 36,
                                        color: activo
                                            ? undefined
                                            : "text.secondary"
                                    }}
                                >
                                    <Icono fontSize="small" />
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.texto}
                                    primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                        fontWeight: activo
                                            ? 600
                                            : 500
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}

            </List>

        </Box>
    );

    return (
        <>
            {/* Sidebar fija en desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    width: ANCHO_SIDEBAR,
                    flexShrink: 0,
                    display: {
                        xs: "none",
                        md: "block"
                    },
                    "& .MuiDrawer-paper": {
                        width: ANCHO_SIDEBAR,
                        boxSizing: "border-box",
                        borderRight: "1px solid",
                        borderColor: "divider"
                    }
                }}
            >
                {contenido}
            </Drawer>

            {/* Menú hamburguesa en mobile/tablet */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: {
                        xs: "block",
                        md: "none"
                    },
                    "& .MuiDrawer-paper": {
                        width: ANCHO_SIDEBAR,
                        boxSizing: "border-box"
                    }
                }}
            >
                {contenido}
            </Drawer>
        </>
    );
}

export default Sidebar;
export { ANCHO_SIDEBAR };
