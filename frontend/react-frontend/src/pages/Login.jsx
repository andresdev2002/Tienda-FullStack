import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API_URL}/auth/login?username=${username}&password=${password}`,
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "token",
                    data.access_token
                );

                navigate("/dashboard");

            } else {

                setMensaje(data.detail);
            }

        } catch (error) {

            setMensaje("Error conexión");
        }
    };

    return (

        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Iniciar sesión
                </button>

            </form>

            <p>{mensaje}</p>

        </div>
    );
}

export default Login;