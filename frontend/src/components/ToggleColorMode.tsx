import React, {useEffect, useMemo, useState} from "react";
import { CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {ColorModeContext} from "../context/DarkModeContext.tsx"
import {createMuiTheme} from "../theme/theme.tsx";
import Cookies from "js-cookie"
interface ToggleColorModeProps {
    children : React.ReactNode
}
const ToggleColorMode: React.FC<ToggleColorModeProps> = ({children}) => {

    const storedMode = Cookies.get("colorMode") as "light"|"dark"
    const preferedDarkMode = useMediaQuery("([prefers-color-scheme:dark])")
    const defaultMode = storedMode || (preferedDarkMode ? "dark": "light")
    const [mode, setMode] = useState<"light"| "dark">(defaultMode)

    const toggleColorMode = React.useCallback(() => {
        setMode((prevMode) => (prevMode === "light" ? "dark": "light"))
    }, [])


    useEffect(()=> {
        Cookies.set("colorMode", mode)
    }, [mode])


    const colorMode = useMemo(() => ({toggleColorMode}), [toggleColorMode])

    const theme = React.useMemo(() => createMuiTheme(mode), [mode])

    return(
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )

}

export default ToggleColorMode
