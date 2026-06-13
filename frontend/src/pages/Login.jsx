import { useState, useContext } from "react";

import {
    Container,
    Paper,
    Typography,
    TextField,
    Button
    } from "@mui/material";

    import { useNavigate } from "react-router-dom";

    import { login } from "../services/authService";

    import { AuthContext } from "../context/AuthContext";

    function Login() {

    const navigate = useNavigate();

    const { guardarToken } = useContext(
        AuthContext
    );

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const iniciarSesion = async () => {

        try {

        const response = await login(
            email,
            password
        );

        guardarToken(
            response.access_token
        );

        navigate("/dashboard");

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