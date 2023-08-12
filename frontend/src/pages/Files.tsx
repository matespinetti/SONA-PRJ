import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import DrawMenus from "../components/PrimaryDraw/DrawMenus.tsx";
import Main from "./templates/Main.tsx";
import RulesTable from "../components/Page/RulesPage/RulesTable.tsx";
import FilesTable from "../components/Page/FilesPage/FilesTable.tsx";


const Rules = () => {
    return (
        <Box sx={{display:"flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                <DrawMenus/>
            </PrimaryDraw>

            <Main>
                <FilesTable/>
            </Main>
        </Box>
    )
}


export default Rules
