import {
    useContext,
    useState,
    useMemo
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    TextField,
    InputAdornment,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    Tooltip,
    Badge,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    ClickAwayListener
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { AuthContext } from "../../context/AuthContext";
import { ThemeModeContext } from "../../theme/ThemeModeContext";
import { menuItems } from "../../config/navigation";
import { ANCHO_SIDEBAR } from "./Sidebar";

const NOMBRES_ROL = {
    1: "Administrador",
    2: "Vendedor",
    3: "Bodeguero"
};

// Colores estables para el avatar, elegidos según
// el nombre del usuario (mismo nombre = mismo color
// siempre, sin necesidad de guardar nada nuevo).
const COLORES_AVATAR = [
    "#2563EB", "#7C3AED", "#DB2777",
    "#D97706", "#16A34A", "#0891B2"
];

function colorAvatar(nombre) {

    if (!nombre) return COLORES_AVATAR[0];

    const codigo = nombre
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return COLORES_AVATAR[codigo % COLORES_AVATAR.length];
}

function iniciales(nombre) {

    if (!nombre) return "?";

    const partes = nombre.trim().split(" ");

    if (partes.length === 1) {
        return partes[0].slice(0, 2).toUpperCase();
    }

    return (
        partes[0][0] + partes[partes.length - 1][0]
    ).toUpperCase();
}

function Navbar({
    onMenuClick,
    notificationCount = 0,
    notificationLabel = ""
}) {

    const { usuario, logout } = useContext(AuthContext);
    const { modo, alternarModo } = useContext(ThemeModeContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [anchorPerfil, setAnchorPerfil] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [mostrarResultados, setMostrarResultados] =
        useState(false);

    const moduloActual = menuItems.find(
        (item) => item.ruta === location.pathname
    );

    const tituloPagina = moduloActual?.texto || "Sistema Inventario";

    // =========================================
    // BUSCADOR (navegación rápida entre módulos
    // que el usuario tiene permiso de ver)
    // =========================================

    const modulosDisponibles = useMemo(
        () =>
            menuItems.filter((item) =>
                item.roles.includes(usuario?.rol_id)
            ),
        [usuario]
    );

    const resultadosBusqueda = useMemo(() => {

        if (!busqueda.trim()) return [];

        return modulosDisponibles.filter((item) =>
            item.texto
                .toLowerCase()
                .includes(busqueda.toLowerCase())
        );

    }, [busqueda, modulosDisponibles]);

    const irAModulo = (ruta) => {

        navigate(ruta);

        setBusqueda("");
        setMostrarResultados(false);
    };

    const handleBusquedaSubmit = (e) => {

        e.preventDefault();

        if (resultadosBusqueda.length > 0) {

            irAModulo(resultadosBusqueda[0].ruta);
        }
    };

    // =========================================
    // MENÚ DE PERFIL
    // =========================================

    const handleLogout = () => {

        setAnchorPerfil(null);

        logout();

        navigate("/");
    };

    const nombreRol = NOMBRES_ROL[usuario?.rol_id] || "";

    return (

        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: {
                    md: `calc(100% - ${ANCHO_SIDEBAR}px)`
                },
                ml: { md: `${ANCHO_SIDEBAR}px` },
                backgroundColor: "background.paper",
                color: "text.primary",
                borderBottom: "1px solid",
                borderColor: "divider"
            }}
        >

            <Toolbar sx={{ gap: 1.5 }}>

                {/* Hamburguesa - solo en mobile/tablet */}
                <IconButton
                    onClick={onMenuClick}
                    sx={{ display: { md: "none" } }}
                    aria-label="Abrir menú"
                >
                    <MenuRoundedIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        minWidth: 0,
                        flexShrink: 0,
                        display: { xs: "none", sm: "block" }
                    }}
                >
                    {tituloPagina}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {/* Buscador / navegación rápida */}
                <ClickAwayListener
                    onClickAway={() =>
                        setMostrarResultados(false)
                    }
                >
                    <Box
                        component="form"
                        onSubmit={handleBusquedaSubmit}
                        sx={{
                            position: "relative",
                            width: {
                                xs: 130,
                                sm: 220,
                                md: 280
                            }
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Buscar módulo..."
                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value);
                                setMostrarResultados(true);
                            }}
                            onFocus={() =>
                                setMostrarResultados(true)
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRoundedIcon
                                            fontSize="small"
                                            color="action"
                                        />
                                    </InputAdornment>
                                )
                            }}
                        />

                        {mostrarResultados &&
                            resultadosBusqueda.length > 0 && (

                            <Paper
                                elevation={3}
                                sx={{
                                    position: "absolute",
                                    top: "calc(100% + 6px)",
                                    left: 0,
                                    right: 0,
                                    zIndex: 20,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    overflow: "hidden"
                                }}
                            >
                                <List dense disablePadding>

                                    {resultadosBusqueda.map(
                                        (item) => {

                                            const Icono =
                                                item.icono;

                                            return (
                                                <ListItemButton
                                                    key={item.ruta}
                                                    onClick={() =>
                                                        irAModulo(
                                                            item.ruta
                                                        )
                                                    }
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            minWidth: 32
                                                        }}
                                                    >
                                                        <Icono fontSize="small" />
                                                    </ListItemIcon>

                                                    <ListItemText
                                                        primary={
                                                            item.texto
                                                        }
                                                    />
                                                </ListItemButton>
                                            );
                                        }
                                    )}

                                </List>
                            </Paper>
                        )}
                    </Box>
                </ClickAwayListener>

                {/* Modo claro / oscuro */}
                <Tooltip
                    title={
                        modo === "dark"
                            ? "Modo claro"
                            : "Modo oscuro"
                    }
                >
                    <IconButton
                        onClick={alternarModo}
                        aria-label="Cambiar tema"
                    >
                        {modo === "dark"
                            ? <LightModeRoundedIcon fontSize="small" />
                            : <DarkModeRoundedIcon fontSize="small" />
                        }
                    </IconButton>
                </Tooltip>

                {/* Notificaciones (datos reales: stock bajo) */}
                <Tooltip
                    title={
                        notificationCount > 0
                            ? notificationLabel
                            : "Sin notificaciones"
                    }
                >
                    <IconButton aria-label="Notificaciones">
                        <Badge
                            badgeContent={notificationCount}
                            color="error"
                            invisible={notificationCount === 0}
                        >
                            {notificationCount > 0
                                ? <WarningAmberRoundedIcon fontSize="small" />
                                : <NotificationsRoundedIcon fontSize="small" />
                            }
                        </Badge>
                    </IconButton>
                </Tooltip>

                {/* Avatar / perfil */}
                <Tooltip title={usuario?.nombre || "Usuario"}>
                    <IconButton
                        onClick={(e) =>
                            setAnchorPerfil(e.currentTarget)
                        }
                        sx={{ p: 0.5 }}
                        aria-label="Cuenta"
                    >
                        <Avatar
                            sx={{
                                width: 34,
                                height: 34,
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                bgcolor: colorAvatar(
                                    usuario?.nombre
                                )
                            }}
                        >
                            {iniciales(usuario?.nombre)}
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorPerfil}
                    open={Boolean(anchorPerfil)}
                    onClose={() => setAnchorPerfil(null)}
                    transformOrigin={{
                        horizontal: "right",
                        vertical: "top"
                    }}
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom"
                    }}
                >
                    <Box sx={{ px: 2, py: 1, minWidth: 200 }}>

                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 700 }}
                        >
                            {usuario?.nombre}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {nombreRol}
                        </Typography>

                    </Box>

                    <Divider />

                    <MenuItem
                        onClick={handleLogout}
                        sx={{ color: "error.main" }}
                    >
                        <ListItemIcon>
                            <LogoutRoundedIcon
                                fontSize="small"
                                color="error"
                            />
                        </ListItemIcon>
                        Cerrar sesión
                    </MenuItem>

                </Menu>

            </Toolbar>

        </AppBar>
    );
}

export default Navbar;
