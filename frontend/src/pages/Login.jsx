import {
    useState,
    useContext
} from "react";

import {
    login,
    obtenerPerfil
} from "../services/authService";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    InputAdornment
} from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

    function Login() {

    const navigate = useNavigate();

    const { guardarSesion } = useContext(
    AuthContext
    );
    

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
const iniciarSesion = async (e) => {

    // Permite enviar el formulario con Enter,
    // además del botón.
    if (e) e.preventDefault();

    try {

        // ============================
        // LOGIN
        // ============================

        const response = await login(

            email,

            password

        );

        const token = response.access_token;

        // ============================
        // PERFIL
        // ============================

        const perfil = await obtenerPerfil(
            token
        );

        // ============================
        // GUARDAR SESIÓN
        // ============================

        guardarSesion(

            token,

            perfil

        );

        // Cada rol cae en un módulo que sí puede
        // ver. Bodeguero no tiene Dashboard en la
        // matriz de permisos, así que mandarlo ahí
        // y dejar que el guard lo rebote ya no
        // hace falta - va directo a Productos.

        if (perfil.rol_id === 3) {

            navigate("/productos");

        } else {

            navigate("/dashboard");
        }

    } catch (error) {

        console.error(error);

        alert(
            "Credenciales incorrectas"
        );
    }
};

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "background.default",
                px: 2
            }}
        >

        <Paper
            component="form"
            onSubmit={iniciarSesion}
            sx={{
                p: { xs: 3, sm: 5 },
                width: "100%",
                maxWidth: 420
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2
                    }}
                >
                    <Inventory2RoundedIcon />
                </Box>

                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700 }}
                >
                    Sistema Inventario
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Inicia sesión para continuar
                </Typography>

            </Box>

            <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MailOutlineRoundedIcon
                            fontSize="small"
                            color="action"
                        />
                    </InputAdornment>
                )
            }}
            />

            <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) =>
                setPassword(e.target.value)
            }
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LockRoundedIcon
                            fontSize="small"
                            color="action"
                        />
                    </InputAdornment>
                )
            }}
            />

            <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            startIcon={<LoginRoundedIcon />}
            sx={{ mt: 3 }}
            >
            Ingresar
            </Button>

        </Paper>

        </Box>
    );
}

export default Login;
