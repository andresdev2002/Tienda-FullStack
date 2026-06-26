import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

// =========================================
// TARJETA KPI
// =========================================
// Tratamiento visual de firma de este dashboard:
// un borde de acento a la izquierda (en vez del
// típico "ícono dentro de un círculo pastel" que
// usa cualquier plantilla genérica). El color del
// borde comunica el tipo de métrica: neutral para
// conteos, azul para dinero, rojo/ámbar para
// alertas (stock bajo).

function KpiCard({
    titulo,
    valor,
    icono: Icono,
    color = "primary"
}) {

    const esNeutral = color === "neutral";

    const colorBorde = esNeutral
        ? "divider"
        : `${color}.main`;

    const colorIcono = esNeutral
        ? "text.secondary"
        : `${color}.main`;

    return (

        <Card
            sx={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
                transition:
                    "transform 0.18s ease, box-shadow 0.18s ease",

                "&:hover": {
                    transform: "translateY(-2px)"
                },

                "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    backgroundColor: colorBorde
                }
            }}
        >

            <CardContent
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 1.5
                }}
            >

                <Box sx={{ minWidth: 0 }}>

                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                        noWrap
                    >
                        {titulo}
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 700 }}
                    >
                        {valor}
                    </Typography>

                </Box>

                {Icono && (

                    <Box
                        sx={{
                            color: colorIcono,
                            opacity: esNeutral ? 0.6 : 0.85,
                            display: "flex",
                            flexShrink: 0,
                            mt: 0.5
                        }}
                    >
                        <Icono fontSize="small" />
                    </Box>
                )}

            </CardContent>

        </Card>
    );
}

export default KpiCard;
