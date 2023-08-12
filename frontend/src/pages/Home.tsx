import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import DrawMenus from "../components/PrimaryDraw/DrawMenus.tsx";
import Main from "./templates/Main.tsx";

const Home = () => {

    return (
        <Box sx={{display:"flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                <DrawMenus/>
            </PrimaryDraw>
            <Main/>
        </Box>
    )
}


export default Home
