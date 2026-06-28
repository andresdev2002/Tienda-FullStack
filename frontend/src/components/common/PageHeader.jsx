import { Box, Typography } from "@mui/material";

// =========================================
// ENCABEZADO DE PÁGINA
// =========================================
// Mismo tratamiento visual en todas las páginas
// (título grande + descripción corta), para que
// la app se sienta consistente en vez de que cada
// módulo tenga su propio estilo de encabezado.

function PageHeader({ titulo, descripcion, accion }) {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mb: 3
            }}
        >

            <Box>

                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700 }}
                >
                    {titulo}
                </Typography>

                {descripcion && (

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {descripcion}
                    </Typography>
                )}

            </Box>

            {accion && (
                <Box>{accion}</Box>
            )}

        </Box>
    );
}

export default PageHeader;
