const productosBody = document.getElementById(
    "productosBody"
);

const productoForm = document.getElementById(
    "productoForm"
);

const token = localStorage.getItem("token");


// =========================
// OBTENER PRODUCTOS
// =========================
async function obtenerProductos() {

    try {

        const response = await fetch(
            `${API_URL}/productos`
        );

        const productos = await response.json();

        productosBody.innerHTML = "";

        productos.forEach(producto => {

            productosBody.innerHTML += `
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                </tr>
            `;
        });

    } catch (error) {

        console.error(error);
    }
}


// =========================
// CREAR PRODUCTO
// =========================
productoForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const nombre = document.getElementById(
            "nombre"
        ).value;

        const precio = document.getElementById(
            "precio"
        ).value;

        const stock = document.getElementById(
            "stock"
        ).value;

        try {

            const response = await fetch(
                `${API_URL}/productos`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        nombre,
                        precio,
                        stock
                    })
                }
            );

            if (response.ok) {

                alert("Producto creado");

                productoForm.reset();

                obtenerProductos();

            } else {

                alert("Error creando producto");
            }

        } catch (error) {

            console.error(error);
        }
    }
);


// =========================
// INICIAR
// =========================
obtenerProductos();