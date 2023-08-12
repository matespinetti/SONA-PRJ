import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import DrawMenus from "../components/PrimaryDraw/DrawMenus.tsx";
import Main from "./templates/Main.tsx";
import RejectedTable from "../components/Page/RejectedPage/RejectedTable.tsx";

const Rejected = () => {

    return (
        <Box sx={{display:"flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                <DrawMenus/>
            </PrimaryDraw>
            <Main>
                <RejectedTable />
            </Main>
        </Box>
    )
}


export default Rejected
