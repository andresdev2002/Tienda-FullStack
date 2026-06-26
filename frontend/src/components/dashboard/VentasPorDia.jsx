import {
    Paper,
    Typography,
    Box,
    useTheme
} from "@mui/material";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

// Nota: se usa BarChart (no AreaChart/LineChart) a
// propósito. "Ventas por día" son totales de
// categorías discretas, no una medición continua -
// y una línea/área necesita al menos 2 puntos para
// dibujar algo visible. Con un solo día de ventas,
// una barra sigue mostrando información clara; una
// línea no tendría nada que conectar.

function VentasPorDia({ ventas }) {

    const theme = useTheme();

    return (

        <Paper sx={{ p: 2.5, height: "100%" }}>

            <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
            >
                Ventas por Día
            </Typography>

            {ventas.length === 0 && (

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 220
                    }}
                >
                    <Typography color="text.secondary">
                        Todavía no hay ventas registradas.
                    </Typography>
                </Box>
            )}

            {ventas.length > 0 && (

                <Box sx={{ width: "100%", height: 240 }}>

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart data={ventas}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={
                                    theme.palette.divider
                                }
                                vertical={false}
                            />

                            <XAxis
                                dataKey="fecha"
                                tick={{
                                    fontSize: 11,
                                    fill:
                                        theme.palette.text
                                            .secondary
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{
                                    fontSize: 11,
                                    fill:
                                        theme.palette.text
                                            .secondary
                                }}
                                axisLine={false}
                                tickLine={false}
                                width={50}
                            />

                            <Tooltip
                                cursor={{
                                    fill:
                                        theme.palette.mode ===
                                        "dark"
                                            ? "rgba(255,255,255,0.04)"
                                            : "rgba(15, 23, 42, 0.04)"
                                }}
                                contentStyle={{
                                    borderRadius: 10,
                                    border:
                                        `1px solid ${theme.palette.divider}`,
                                    backgroundColor:
                                        theme.palette
                                            .background.paper,
                                    fontSize: 13
                                }}
                                formatter={(value) => [
                                    value,
                                    "Total vendido"
                                ]}
                            />

                            <Bar
                                dataKey="ventas"
                                fill={
                                    theme.palette
                                        .primary.main
                                }
                                radius={[6, 6, 0, 0]}
                                maxBarSize={56}
                            />

                        </BarChart>
                    </ResponsiveContainer>

                </Box>
            )}

        </Paper>
    );
}

export default VentasPorDia;
