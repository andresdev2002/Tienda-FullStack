import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

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
    }
];

    function Sidebar() {
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
<List>
    {menuItems.map((item) => (
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