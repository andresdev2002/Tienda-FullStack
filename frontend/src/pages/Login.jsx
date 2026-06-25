import {
    useState,
    useContext
} from "react";

import {
    login,
    obtenerPerfil
} from "../services/authService";

import {
    Container,
    Paper,
    Typography,
    TextField,
    Button
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

    function Login() {

    const navigate = useNavigate();

    const { guardarSesion } = useContext(
    AuthContext
    );
    

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
const iniciarSesion = async () => {

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

        <Container maxWidth="sm">

        <Paper
            sx={{
            mt: 10,
            p: 4
            }}
        >

            <Typography
            variant="h4"
            gutterBottom
            >
            Iniciar Sesión
            </Typography>

            <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            />

            <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) =>
                setPassword(e.target.value)
            }
            />

            <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={iniciarSesion}
            >
            Ingresar
            </Button>

        </Paper>

        </Container>
    );
}

export default Login;