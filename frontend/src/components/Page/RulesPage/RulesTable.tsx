import useCrud from "../../../hooks/useCrud.ts";
import {useEffect, useState} from "react";
import MaterialTable, {Column} from "@material-table/core"
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import {forwardRef} from "react";
import Checkbox from "@mui/material/Checkbox";
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
    const {dataCRUD, error, isLoading, fetchData, postData, updateData, setDataCRUD} = useCrud<Rule>([], "/rules/select/")
    useEffect(() => {
        fetchData()
    }, [])




    const columns = [
        {title: "id", field: "id", editable: "never"},
        {title: "prtname", field: "prtname",},
        {title: "priority", field: "priority",},
        {title: "locationregex", field: "locationregex",},
        {title: "destination", field: "destination",},
        {title: "username", field: "username",},
        {title: "h323remote_address", field: "h323remote_address",},
        {title: "nas_port_name", field: "nas_port_name",},
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
        <div className="App">
            <MaterialTable
                icons={tableIcons}
                title="RULES"
                columns={columns}
                data={dataCRUD}
                options={{ actionsColumnIndex: -1, addRowPosition: "first", filtering:true }}
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
            />
        </div>
    );
}

export default RulesTable
