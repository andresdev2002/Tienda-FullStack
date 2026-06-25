import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Box,
    Button,
    Divider
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { AuthContext } from "../../context/AuthContext";

// Roles permitidos por módulo, según la matriz:
// 1 = Administrador, 2 = Vendedor, 3 = Bodeguero

const menuItems = [
    {
        texto: "Dashboard",
        ruta: "/dashboard",
        roles: [1, 2]
    },
    {
        texto: "Productos",
        ruta: "/productos",
        roles: [1, 2, 3]
    },
    {
        texto: "Clientes",
        ruta: "/clientes",
        roles: [1, 2]
    },
    {
        texto: "Proveedores",
        ruta: "/proveedores",
        roles: [1, 3]
    },
    {
        texto: "Ventas",
        ruta: "/ventas",
        roles: [1, 2]
    },
    {
        texto: "Inventario",
        ruta: "/inventario",
        roles: [1, 3]
    },
    {
        texto: "Entradas",
        ruta: "/entradas",
        roles: [1, 3]
    },

    {
    texto: "Kardex",
    ruta: "/kardex",
    roles: [1, 3]
    },

    {
        texto: "Usuarios",
        ruta: "/usuarios",
        roles: [1]
    }
];

    function Sidebar() {
        const { usuario, logout } = useContext(
        AuthContext
    );

    const navigate = useNavigate();

    // =========================================
    // CERRAR SESIÓN
    // =========================================
    // logout() ya existía en AuthContext (limpia
    // localStorage y el estado), solo faltaba el
    // botón que lo llamara y redirigiera a /login.

    const handleLogout = () => {

        logout();

        navigate("/");
    };

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

    // Cada item del menú declara qué roles pueden
    // verlo. Esto refleja la matriz de permisos del
    // backend; si un módulo no aparece aquí para un
    // rol, tampoco debería estar accesible por API.

    const items = menuItems.filter((item) =>
        item.roles.includes(usuario?.rol_id)
    );

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

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
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
<List sx={{ flexGrow: 1 }}>
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

<Divider />

<Box sx={{ p: 2 }}>

    <Button
        fullWidth
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
    >
        Cerrar sesión
    </Button>

</Box>

        </Box>
        </Drawer>
    );
    }

export default Sidebar;