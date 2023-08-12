import {Box, Typography, useTheme} from "@mui/material";
import React, {ReactNode} from "react";

type Props = {
    children: ReactNode
}

type ChildProps = {

}

type ChildElement = React.ReactElement<ChildProps>


const Main: React.FC<Props> = ({children}) => {
    const theme = useTheme()
    return (
        <Box sx={{mt:`${theme.primaryAppBar.height}px`, ml: `${theme.primaryDraw.width + 14}px`}}>
            {React.Children.map(children, (child) => {
                return React.isValidElement(child) ? React.cloneElement(child as ChildElement): child
            })}
        </Box>
    )
}

export default Main
