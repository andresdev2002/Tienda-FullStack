import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

function UltimasVentas({ ventas }) {

    return (

        <Paper sx={{ p: 2.5 }}>

            <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
            >
                Últimas Ventas
            </Typography>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>
                            ID
                        </TableCell>

                        <TableCell>
                            Cliente
                        </TableCell>

                        <TableCell align="right">
                            Total
                        </TableCell>

                        <TableCell>
                            Estado
                        </TableCell>

                        <TableCell>
                            Fecha
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {ventas.length === 0 && (

                        <TableRow>

                            <TableCell colSpan={5}>
                                Todavía no hay ventas
                                registradas.
                            </TableCell>

                        </TableRow>
                    )}

                    {ventas.map((venta) => (

                        <TableRow key={venta.id_venta}>

                            <TableCell>
                                {venta.id_venta}
                            </TableCell>

                            <TableCell>
                                {venta.cliente || "—"}
                            </TableCell>

                            <TableCell align="right">
                                {venta.total}
                            </TableCell>

                            <TableCell>

                                <Typography
                                    variant="body2"
                                    color={
                                        venta.estado ===
                                        "DEVUELTA"
                                            ? "error"
                                            : "success.main"
                                    }
                                >
                                    {venta.estado}
                                </Typography>

                            </TableCell>

                            <TableCell>
                                {new Date(
                                    venta.fecha
                                ).toLocaleString()}
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </Paper>
    );
}

export default UltimasVentas;
