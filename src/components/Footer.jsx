import React from "react";

import {AppBar, Typography, Toolbar} from "@mui/material";
import LinkA from "@mui/material/Link";

export default function () {
    return <div className="footer">
            <Typography>© 2021 Алексей Цырульников</Typography>

            <LinkA color="inherit" href="https://freedns.afraid.org/">Free DNS</LinkA>
    </div>
}
