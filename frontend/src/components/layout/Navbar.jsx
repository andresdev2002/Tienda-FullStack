import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
    return (
        <AppBar
        position="fixed"
        sx={{
            width: `calc(100% - 240px)`,
            ml: `240px`,
        }}
        >
        <Toolbar>
            <Typography variant="h6">
            Sistema Inventario
            </Typography>
        </Toolbar>
        </AppBar>
    );
    }

export default Navbar;