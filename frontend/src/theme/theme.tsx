import {createTheme, responsiveFontSizes} from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number
        }
        primaryDraw:{
            width: number
        }
    }

    interface ThemeOptions {
        primaryAppBar: {
            height: number
        }
        primaryDraw:{
            width: number
        }

    }

}

export const createMuiTheme = (mode: "light" | "dark") => {
    let theme = createTheme({

        typography:{
            fontFamily: ['IBM Plex Sans', "sans-serif"].join(","),
        },
        primaryAppBar: {
            height: 50,
        },
        primaryDraw:{
          width:240,
        },

        palette: {
          mode,
        },
        components:{
            MuiAppBar:{
                defaultProps:{
                    color:"default",
                    elevation: 0
                }
            }
        }

    })

    theme = responsiveFontSizes(theme)
    return theme

}
