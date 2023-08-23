import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import {AccountCircle, Brightness4} from "@mui/icons-material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch.tsx";
import {useState} from "react";
import {useAuthService} from "../../services/AuthServices.ts";
import Button from "@mui/material/Button";
const AccountButton = () => {
    const [anchorEl, setAnchorEl] = useState<null| HTMLElement>(null)
    const {logout} = useAuthService()
    const IsMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleProfileMenuClose = () => {
        setAnchorEl(null)
    }

    const renderMenu = (
        <Menu open={IsMenuOpen} anchorEl={anchorEl} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} keepMounted onClose={handleProfileMenuClose}>
            <MenuItem>
                <DarkModeSwitch />
            </MenuItem>
            <MenuItem>
                <Button onClick={logout}>Logout</Button>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{display: {xs:"flex"}}}>
            <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
                <AccountCircle />
            </IconButton>

            {renderMenu}
        </Box>
    )
}

export default AccountButton
