import React from "react";

import {AppBar, Typography, Toolbar} from "@mui/material";
import LinkA from "@mui/material/Link";

export default function () {
    return <AppBar position="static" sx={{top: "auto", bottom: 0}}>
        <Toolbar sx={{
            '& > :not(style) + :not(style)': {
                ml: 2,
            },
        }}>
            <Typography>© 2021 Алексей Цырульников</Typography>

            <LinkA color="inherit" href="https://freedns.afraid.org/">Free DNS</LinkA>
        </Toolbar>
    </AppBar>
}
