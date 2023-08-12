import {Box, Drawer, Link, List, ListItem, styled, Typography, useMediaQuery} from "@mui/material";
import React, {ReactNode, useEffect, useState} from "react";
import {useTheme} from "@mui/material";
import {useDrawer} from "../../context/DrawerProvider.tsx";
type Props = {
    children: ReactNode
}

type ChildProps = {

}

type ChildElement = React.ReactElement<ChildProps>
const PrimaryDraw: React.FC<Props> = ({children}) => {
    const theme = useTheme();
    const belowSm = useMediaQuery(theme.breakpoints.down("sm"));
    const {isDrawerOpen, toggleDrawer} = useDrawer()
    useEffect(() => {
        if (belowSm){
            isDrawerOpen && toggleDrawer()
        }
    }, [belowSm, isDrawerOpen, toggleDrawer])





    return (
        <Drawer
            open = {isDrawerOpen}
            variant={belowSm ? "temporary" : "permanent"}
            PaperProps={{
                sx: {
                    mt: `${theme.primaryAppBar.height}px`,
                    height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
                    width: theme.primaryDraw.width,
                },
            }}
        >
            <Box>
                    {React.Children.map(children, (child) => {
                        return React.isValidElement(child) ? React.cloneElement(child as ChildElement): child
                    })}

            </Box>
        </Drawer>
    );
};
export default PrimaryDraw
