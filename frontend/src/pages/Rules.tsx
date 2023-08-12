import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor.ts"
import DrawMenus from "../components/PrimaryDraw/DrawMenus.tsx";
import Main from "./templates/Main.tsx";
import RulesTable from "../components/Page/RulesPage/RulesTable.tsx";


const Rules = () => {
    return (
        <Box sx={{display:"flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                <DrawMenus/>
            </PrimaryDraw>

            <Main>
                <RulesTable/>
            </Main>
        </Box>
    )
}


export default Rules
