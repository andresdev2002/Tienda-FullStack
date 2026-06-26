import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

// =========================================
// TARJETA KPI
// =========================================
// Antes este markup estaba repetido inline en
// Dashboard.jsx dentro de un .map(). Se saca
// aquí para que la carpeta components/dashboard
// tenga sentido, igual que el resto de módulos
// (ModalProducto, ModalCliente, etc. ya viven en
// su propia carpeta de componentes).

function KpiCard({ titulo, valor }) {

    return (

        <Card>

            <CardContent>

                <Typography
                    color="text.secondary"
                >
                    {titulo}
                </Typography>

                <Typography variant="h4">
                    {valor}
                </Typography>

            </CardContent>

        </Card>
    );
}

export default KpiCard;
