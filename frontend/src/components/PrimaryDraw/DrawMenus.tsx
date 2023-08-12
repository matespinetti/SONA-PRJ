
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link, useLocation } from 'react-router-dom';



const DrawMenus = () => {
    const location = useLocation(); // Get the current location
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    React.useEffect(() => {
        // Update the selected index based on the current pathname
        if (location.pathname === "/rules") {
            setSelectedIndex(0);
        } else if (location.pathname === "/files") {
            setSelectedIndex(1);
        } else if (location.pathname === "/rejected") {
            setSelectedIndex(2);
        }
    }, [location.pathname]);

    return (
        <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper', alignItems: "left" }}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                    component={Link}
                    to="/rules"
                    selected={selectedIndex === 0}
                    onClick={() => setSelectedIndex(0)}
                >
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary="RULES" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/files"
                    selected={selectedIndex === 1}
                    onClick={() => setSelectedIndex(1)}
                >
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary="FILE ENTRIES" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/rejected"
                    selected={selectedIndex === 2}
                    onClick={() => setSelectedIndex(2)}
                >
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary="REJECTED CDRS" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default DrawMenus;
