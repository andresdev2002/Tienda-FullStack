import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

// =========================================
// NAVEGACIÓN
// =========================================
// Única fuente de verdad para Sidebar (lista de
// módulos), Navbar (título de página + buscador) y
// el guard de rutas. roles: 1 = Administrador,
// 2 = Vendedor, 3 = Bodeguero — igual a la matriz
// ya implementada en el backend.

export const menuItems = [
    {
        texto: "Dashboard",
        ruta: "/dashboard",
        roles: [1, 2],
        icono: DashboardRoundedIcon
    },
    {
        texto: "Reportes",
        ruta: "/reportes",
        roles: [1, 2],
        icono: AssessmentRoundedIcon
    },
    {
        texto: "Productos",
        ruta: "/productos",
        roles: [1, 2, 3],
        icono: Inventory2RoundedIcon
    },
    {
        texto: "Clientes",
        ruta: "/clientes",
        roles: [1, 2],
        icono: PeopleAltRoundedIcon
    },
    {
        texto: "Proveedores",
        ruta: "/proveedores",
        roles: [1, 3],
        icono: LocalShippingRoundedIcon
    },
    {
        texto: "Ventas",
        ruta: "/ventas",
        roles: [1, 2],
        icono: PointOfSaleRoundedIcon
    },
    {
        texto: "Inventario",
        ruta: "/inventario",
        roles: [1, 3],
        icono: WarehouseRoundedIcon
    },
    {
        texto: "Entradas",
        ruta: "/entradas",
        roles: [1, 3],
        icono: AddBoxRoundedIcon
    },
    {
        texto: "Kardex",
        ruta: "/kardex",
        roles: [1, 3],
        icono: HistoryRoundedIcon
    },
    {
        texto: "Usuarios",
        ruta: "/usuarios",
        roles: [1],
        icono: ManageAccountsRoundedIcon
    }
];
