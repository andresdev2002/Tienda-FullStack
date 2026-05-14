// =========================
// ELEMENTOS
// =========================
const ingresos = document.getElementById(
    "ingresos"
);

const ventas = document.getElementById(
    "ventas"
);

const producto = document.getElementById(
    "producto"
);

const filtroForm = document.getElementById(
    "filtroForm"
);

const listaProductos = document.getElementById(
    "listaProductos"
);


// =========================
// CARGAR DASHBOARD
// =========================
async function cargarDashboard() {

    try {

        // =========================
        // INGRESOS
        // =========================
        const responseIngresos =
            await fetch(
                `${API_URL}/reportes/ingresos`
            );

        const dataIngresos =
            await responseIngresos.json();

        ingresos.innerText =
            `$ ${dataIngresos.total_ingresos}`;


        // =========================
        // VENTAS
        // =========================
        const responseVentas =
            await fetch(
                `${API_URL}/reportes/ventas`
            );

        const dataVentas =
            await responseVentas.json();

        ventas.innerText =
            dataVentas.numero_ventas;


        // =========================
        // PRODUCTO MÁS VENDIDO
        // =========================
        const responseProducto =
            await fetch(
                `${API_URL}/reportes/producto-mas-vendido`
            );

        const dataProducto =
            await responseProducto.json();

        producto.innerText =
            `${dataProducto.producto} (${dataProducto.cantidad_vendida})`;

    } catch (error) {

        console.error(error);
    }
}


// =========================
// FILTRO PRODUCTOS
// =========================
filtroForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const min_precio =
            document.getElementById(
                "min_precio"
            ).value;

        const max_precio =
            document.getElementById(
                "max_precio"
            ).value;

        try {

            const response =
                await fetch(
                    `${API_URL}/reportes/productos-por-precio?min_precio=${min_precio}&max_precio=${max_precio}`
                );

            const productos =
                await response.json();

            listaProductos.innerHTML = "";

            productos.forEach(producto => {

                listaProductos.innerHTML += `
                    <li>
                        ${producto.nombre}
                        - $${producto.precio}
                    </li>
                `;
            });

        } catch (error) {

            console.error(error);
        }
    }
);


// =========================
// INICIAR
// =========================
cargarDashboard();