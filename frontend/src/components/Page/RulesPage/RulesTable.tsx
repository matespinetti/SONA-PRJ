import useCrud from "../../../hooks/useCrud.ts";
import {useEffect, useState} from "react";
import MaterialTable, {Column} from "@material-table/core"
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import {forwardRef} from "react";
import Checkbox from "@mui/material/Checkbox";
import {IconButton, MenuItem, Select, TableCell} from "@mui/material";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.tsx";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {set} from "js-cookie";
interface Rule {
    id: bigint
    prtname: string
    priority: bigint
    locationregex: string
    destination: string
    username: string
    h323remote_address: string
    nas_port_name: string
    active: boolean
    created: string
    modified: string

}
const RulesTable = () => {
    const {dataCRUD, fetchData, postData, updateData, setDataCRUD, deleteData} = useCrud<Rule>([], "/rules/select/")
    const [selectedRows, setSelectedRows] = useState([])


    const [confirmationOpen, setConfirmationOpen] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])



    const handleBulkDelete = async () => {
        try {
            for (const row of selectedRows) {
                await deleteData(row.id)
            }
            setSelectedRows([])


        } catch (error) {
            console.error("Error deleting selected rows: ", error)
        }
    }



    const columns = [
        {title: "id", field: "id", editable: "never"},
        {
            title: "prtname",
            field: "prtname",
            render: rowData => rowData.prtname, // Display the value as-is in non-edit mode
            editComponent: props => (
                <TableCell>
                    <Select
                        value={props.value || "SMS"} // Default value for new rows
                        onChange={e => props.onChange(e.target.value)}
                        style={{ width: "100%" }}
                    >
                        <MenuItem value="SMS">SMS</MenuItem>
                        <MenuItem value="DATA">DATA</MenuItem>
                        <MenuItem value="VOICE">VOICE</MenuItem>
                    </Select>
                </TableCell>
            ),
        },
        {title: "priority", field: "priority",},
        {
            title: "locationregex",
            field: "locationregex",
        },
        {title: "destination", field: "destination",},
        {
            title: "username",
            field: "username",
            render: rowData => rowData.username, // Display the value as-is in non-edit mode
            editComponent: props => (
                <TableCell>
                    <Select
                        value={props.value || "[$onr]"} // Default value for new rows
                        onChange={e => props.onChange(e.target.value)}
                        style={{ width: "100%" }}
                    >
                        <MenuItem value="[$onr]">[$onr]</MenuItem>
                        <MenuItem value="[$nr]">[$nr]</MenuItem>
                    </Select>
                </TableCell>
            ),
        },
        {title: "h323remote_address", field: "h323remote_address",},
        {
            title: "nas_port_name",
            field: "nas_port_name",
            render: rowData => rowData.nas_port_name, // Display the value as-is in non-edit mode
            editComponent: props => (
                <TableCell>
                    <Select
                        value={props.value || ""} // Default value for new rows
                        onChange={e => props.onChange(e.target.value)}
                        style={{ width: "100%" }}
                    >
                        <MenuItem value=""> None </MenuItem>
                        <MenuItem value="SMS">SMS</MenuItem>
                        <MenuItem value="Internet">Internet</MenuItem>
                    </Select>
                </TableCell>
            ),
        },
        {title: "active" , field: "active", type: "boolean", render: rowData => (
                <Checkbox checked={rowData.active} disabled />
            ),},
        {title: "created", field: "created", editable: "never", type:"datetime"},
        {title: "modified", field: "modified", editable: "never", type:"datetime"}// Show existing value or current date},


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

    // @ts-ignore
    return (
        <div className="App" style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
            <div style={{ width: "100%", maxWidth: "1500px", marginLeft: "8%" }}>
                <MaterialTable
                    icons={tableIcons}
                    title="RULES"
                    columns={columns}
                    onSelectionChange={(rows) => {
                        setSelectedRows(rows);
                    }}
                    data={dataCRUD}
                    options={{ actionsColumnIndex: -1, addRowPosition: "first", filtering:true, padding:"dense", pageSize:10, selection:true }}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise<void>((resolve, reject) => {
                                postData(newData)
                                    .then(() => {
                                        fetchData();
                                        resolve();
                                    })
                                    .catch((error) => {
                                        console.error("Error adding new rule:", error);
                                        reject();
                                    });
                            }),

                        onRowUpdate: (newData, oldData) =>
                            new Promise<void>((resolve, reject) => {
                                newData.modified = new Date().toISOString()
                                if (!setDataCRUD) {
                                    reject(new Error("setDataCRUD is not available"));
                                    return;
                                }
                                updateData(newData, oldData)
                                    .then((updatedData) => {
                                        const updatedDataCRUD = dataCRUD.map(item => {
                                            if (item.id === updatedData.id) {
                                                return updatedData;
                                            }
                                            return item;
                                        });
                                        setDataCRUD(updatedDataCRUD);
                                        resolve();
                                    })
                                    .catch((error) => {
                                        console.error("Error updating rule:", error);
                                        reject();
                                    });
                            }),
                    }}
                    actions = {[
                        {icon: () => <IconButton> <DeleteOutline/> </IconButton>, tooltip: "Delete all selected rows",
                        onClick: handleBulkDelete},
                    ]}
                />



        </div>

        </div>
    );
}

export default RulesTable
