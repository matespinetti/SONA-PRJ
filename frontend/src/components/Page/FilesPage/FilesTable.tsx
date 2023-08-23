import useCrud from "../../../hooks/useCrud.ts";
import {useEffect, useState} from "react";
import MaterialTable, {Column} from "@material-table/core"
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import {forwardRef} from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Box, IconButton} from "@mui/material";
import { CsvBuilder } from 'filefy';


import CDRsModal from "./cdrs/CDRsModal.tsx";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
interface FileEntry {
    id: bigint
    filename: string
    contract_id: string
    file_type: string
    sequence: bigint
    version: bigint
    created: string
    qty_input: bigint
    qty_rejected: bigint
    qty_output: bigint
    status: string

}
const FilesTable = () => {
    const {dataCRUD, fetchData,} = useCrud<FileEntry>([], "/files/select/")
    const [selectedFileId, setSelectedFileId] = useState(null); // State to store the selected file_id
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([])
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const pollingInterval = 2 * 60 * 1000

    useEffect(() => {
        const fetchDataAndPoll = async () => {
            await fetchData()
        }

        fetchDataAndPoll()

        const pollingTimer = setInterval(() => {
            fetchDataAndPoll()
        }, pollingInterval)


        return () => {
            clearInterval(pollingTimer)
        }


    }, [])






    const columns = [
        {title: "id", field: "id"},
        {title: "filename", field: "filename",},
        {title: "contract_id", field: "contract_id",},
        {title: "file_type", field: "file_type",},
        {title: "sequence", field: "sequence",},
        {title: "version", field: "version",},
        {title: "created", field: "created",},
        {title: "qty_input", field: "qty_input",},
        {title: "qty_rejected" , field: "qty_rejected"},
        {title: "qty_output", field: "qty_output"},
        {title: "status", field: "status"},// Show existing value or current date},
        {
            title: "Show CDRS",
            render: (rowData) => (
                <IconButton
                    className="show-cdrs-button"
                    onClick={() => {
                        setSelectedFileId(rowData.id);
                        openModal(); // Open the modal
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
            ),
        },

    ]


    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };


    const exportAllSelectedRows = () => {

        const columnToExport = columns.filter(col => col.title !== "Show CDRS")
        var csvBuilder = new CsvBuilder("user_list.csv")
            .setColumns(columnToExport.map(col=>col.title))
            .addRows(selectedRows.map(rowData=>columns.map(col=>rowData[col.field])))
            .exportFile();
    }


    return (
        <div className="App" style={{display:"flex", justifyContent:"center", marginTop:"3%"}}>

            <div style={{width: "100%", maxWidth: "1500px", marginLeft:"8%"}}>
                <MaterialTable
                icons={tableIcons}
                title="FILE ENTRIES"
                columns={columns}
                data={dataCRUD}
                onSelectionChange={(rows) => setSelectedRows(rows)}
                options={{ actionsColumnIndex: -1, addRowPosition: "first", filtering:true, padding: "dense", pageSize:10, selection: true}}
                actions = {[
                    {icon: () => <IconButton> <SaveAlt/> </IconButton>,
                    tooltip: "Export all selected rows",
                    onClick: () => exportAllSelectedRows()}
                ]}
            />

            </div>


            {isModalOpen && (
                <CDRsModal open={isModalOpen} onClose={closeModal} selectedFileId={selectedFileId} />
            )}
        </div>
    );
}

export default FilesTable
