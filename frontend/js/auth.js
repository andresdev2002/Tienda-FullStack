const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById(
        "username"
    ).value;

    const password = document.getElementById(
        "password"
    ).value;

    try {

        const response = await fetch(
            `${API_URL}/auth/login?username=${username}&password=${password}`,
            {
                method: "POST"
            }
        );

        const data = await response.json();

        if (response.ok) {

            // =========================
            // GUARDAR TOKEN
            // =========================
            localStorage.setItem(
                "token",
                data.access_token
            );

            document.getElementById(
                "mensaje"
            ).innerText = "Login exitoso";

            // =========================
            // REDIRECCIÓN
            // =========================
            window.location.href = "./productos.html";

        } else {

            document.getElementById(
                "mensaje"
            ).innerText = data.detail;
        }

    } catch (error) {

        console.error(error);

        document.getElementById(
            "mensaje"
        ).innerText = "Error de conexión";
    }

});