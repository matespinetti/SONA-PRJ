import {AppBar, Box, Drawer, IconButton, Link, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import {useEffect, useState} from "react";
import AccountButton from "../../components/PrimaryAppBar/AccountButton.tsx";

import {useDrawer} from "../../context/DrawerProvider.tsx";
import PrimaryDraw from "./PrimaryDraw.tsx";
const PrimaryAppBar = () => {

    const theme = useTheme()

    const isSmallScreenOrMore = useMediaQuery(theme.breakpoints.up("sm"))
    const { toggleDrawer} = useDrawer()


    return (

        <AppBar sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            backgroundColor: theme.palette.background.default,
            borderBottom:`1px solid ${theme.palette.divider}`,
        }}>
            <Toolbar variant="dense" sx={{height: theme.primaryAppBar.height, minHeight: theme.primaryAppBar.height}}>
                <Box sx={{ display: {xs: "block", sm: "none"}}}>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{mr:2}} onClick={toggleDrawer}>
                        <MenuIcon>

                        </MenuIcon>
                    </IconButton>
                </Box>

                <Link href="/" underline="none" color="inherit">
                    <Typography variant="h6" noWrap component="div" sx={{display: {fontWeight:700, letterSpacing:"-0.5px"}}}>
                        SONA
                    </Typography>
                </Link>
            <Box sx={{marginLeft:'auto' }}>
                <AccountButton/>
            </Box>
            </Toolbar>


        </AppBar>
    )
}


export default PrimaryAppBar

