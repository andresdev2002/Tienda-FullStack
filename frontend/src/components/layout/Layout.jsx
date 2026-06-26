import { useState } from "react";

import { Box, Toolbar } from "@mui/material";

import Sidebar, { ANCHO_SIDEBAR } from "./Sidebar";
import Navbar from "./Navbar";

function Layout({
    children,
    notificationCount,
    notificationLabel
}) {

    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box sx={{ display: "flex" }}>

            <Navbar
                onMenuClick={() => setMobileOpen(true)}
                notificationCount={notificationCount}
                notificationLabel={notificationLabel}
            />

            <Sidebar
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    p: { xs: 2, sm: 3 },
                    width: {
                        md: `calc(100% - ${ANCHO_SIDEBAR}px)`
                    },
                    minHeight: "100vh",
                    backgroundColor: "background.default"
                }}
            >
                <Toolbar />

                <Box
                    sx={{
                        animation:
                            "fadeIn 0.25s ease",

                        "@keyframes fadeIn": {
                            from: {
                                opacity: 0,
                                transform:
                                    "translateY(4px)"
                            },
                            to: {
                                opacity: 1,
                                transform:
                                    "translateY(0)"
                            }
                        }
                    }}
                >
                    {children}
                </Box>
            </Box>

        </Box>
    );
}

export default Layout;
