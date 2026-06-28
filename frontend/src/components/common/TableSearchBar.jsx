import { TextField, InputAdornment } from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// =========================================
// BARRA DE BÚSQUEDA PARA TABLAS
// =========================================
// Filtro en el navegador (no llama al backend).
// Para los volúmenes de datos de este proyecto es
// suficiente y no agrega ninguna petición extra;
// si algún día la tabla crece a miles de filas,
// esto se podría mover a un parámetro de búsqueda
// en el endpoint correspondiente.

function TableSearchBar({
    value,
    onChange,
    placeholder = "Buscar..."
}) {

    return (

        <TextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            size="small"
            sx={{
                mb: 2,
                maxWidth: 320,
                width: "100%"
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchRoundedIcon
                            fontSize="small"
                            color="action"
                        />
                    </InputAdornment>
                )
            }}
        />
    );
}

export default TableSearchBar;
