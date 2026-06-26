import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

// Por ahora esto se muestra como tabla. Si más
// adelante quieres un gráfico de línea, se puede
// reemplazar este componente por uno con
// "recharts" (no está instalado todavía) sin
// tocar Dashboard.jsx ni el backend.

function VentasPorDia({ ventas }) {

    return (

        <Paper sx={{ p: 2 }}>

            <Typography
                variant="h6"
                gutterBottom
            >
                Ventas por Día
            </Typography>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>
                            Fecha
                        </TableCell>

                        <TableCell align="right">
                            Total Vendido
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {ventas.length === 0 && (

                        <TableRow>

                            <TableCell colSpan={2}>
                                Todavía no hay ventas
                                registradas.
                            </TableCell>

                        </TableRow>
                    )}

                    {ventas.map((item, index) => (

                        <TableRow key={index}>

                            <TableCell>
                                {item.fecha}
                            </TableCell>

                            <TableCell align="right">
                                {item.ventas}
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </Paper>
    );
}

export default VentasPorDia;
