import { useContext } from "react";

import { Link } from "react-router-dom";

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Box
} from "@mui/material";

import { AuthContext } from "../../context/AuthContext";

const menuItems = [
    {
        texto: "Dashboard",
        ruta: "/dashboard"
    },
    {
        texto: "Productos",
        ruta: "/productos"
    },
    {
        texto: "Clientes",
        ruta: "/clientes"
    },
    {
        texto: "Proveedores",
        ruta: "/proveedores"
    },
    {
        texto: "Ventas",
        ruta: "/ventas"
    },
    {
        texto: "Inventario",
        ruta: "/inventario"
    },
    {
        texto: "Entradas",
        ruta: "/entradas"
    },

    {
    texto: "Kardex",
    ruta: "/kardex"
    }
];

    function Sidebar() {
        const { usuario } = useContext(
        AuthContext
    );
    let nombreRol = "";

if (usuario?.rol_id === 1) {

    nombreRol = "Administrador";

}

else if (usuario?.rol_id === 2) {

    nombreRol = "Vendedor";

}

else if (usuario?.rol_id === 3) {

    nombreRol = "Bodeguero";

}

    // El módulo de Usuarios solo lo gestiona
    // el Administrador (rol_id === 1). El resto
    // de módulos todavía se muestra a todos los
    // roles hasta que confirmemos la matriz de
    // permisos completa.

    const items = usuario?.rol_id === 1
        ? [
            ...menuItems,
            { texto: "Usuarios", ruta: "/usuarios" }
        ]
        : menuItems;

    return (
        <Drawer
        variant="permanent"
        sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            },
        }}
        >

        <Box sx={{ p: 2 }}>

    <Typography variant="h6">

        {usuario?.nombre || "Usuario"}

    </Typography>

    <Typography
        variant="body2"
        color="text.secondary"
    >

        Rol: {nombreRol}

    </Typography>

</Box>
<List>
    {items.map((item) => (
        <ListItem
        key={item.texto}
        disablePadding
        >
        <ListItemButton
            component={Link}
            to={item.ruta}
        >
            <ListItemText
            primary={item.texto}
            />
        </ListItemButton>
        </ListItem>
    ))}
</List>
        </Drawer>
    );
    }

export default Sidebar;