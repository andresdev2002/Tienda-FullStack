const ventaForm = document.getElementById(
    "ventaForm"
);

const mensaje = document.getElementById(
    "mensaje"
);

const token = localStorage.getItem("token");

ventaForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const producto_id = document.getElementById(
            "producto_id"
        ).value;

        const cantidad = document.getElementById(
            "cantidad"
        ).value;

        try {

            const response = await fetch(
                `${API_URL}/ventas/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        productos: [
                            {
                                producto_id,
                                cantidad
                            }
                        ]
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                mensaje.innerText =
                    "Venta registrada correctamente";

                ventaForm.reset();

            } else {

                mensaje.innerText =
                    data.detail;
            }

        } catch (error) {

            console.error(error);

            mensaje.innerText =
                "Error de conexión";
        }
    }
)