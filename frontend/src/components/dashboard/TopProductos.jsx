import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

function TopProductos({ productos }) {

    return (

        <Paper sx={{ p: 2 }}>

            <Typography
                variant="h6"
                gutterBottom
            >
                Top 5 Productos Más Vendidos
            </Typography>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>
                            Producto
                        </TableCell>

                        <TableCell align="right">
                            Cantidad Vendida
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {productos.length === 0 && (

                        <TableRow>

                            <TableCell colSpan={2}>
                                Todavía no hay ventas
                                registradas.
                            </TableCell>

                        </TableRow>
                    )}

                    {productos.map((item, index) => (

                        <TableRow key={index}>

                            <TableCell>
                                {item.producto}
                            </TableCell>

                            <TableCell align="right">
                                {item.cantidad_vendida}
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </Paper>
    );
}

export default TopProductos;
