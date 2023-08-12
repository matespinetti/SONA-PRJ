
import useCrud from "../../../hooks/useCrud.ts";
import {useEffect, useState} from "react";
import MaterialTable from "@material-table/core";
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import {forwardRef} from "react";
import Checkbox from "@mui/material/Checkbox";

interface RejectedCdr {
    id: number;
    seq_id: number;
    file_id: string;
    date: string;
    time: string;
    ratop: string;
    onr: string;
    nr: number;
    bnrmask: number;
    prtname: string;
    prtcode: string;
    oreg: string;
    oregname: string;
    reg: string;
    regname: string;
    oopcode: string;
    opcode: string;
    contractcode: string;
    gwname: string;
    custname: string;
    location: string;
    location1: string;
    amount: number;
    unit: string;
    rated: string;
    csc: number;
    rate: number;
    csc2: number;
    rate2: number;
    ratetype: string;
    rateid: string;
    vat: string;
    custcode: string;
    cref_id: string;
    rejection_cause: string;
}

const RejectedTable = () => {
    const {dataCRUD, fetchData,} = useCrud<RejectedCdr>([], "/rejected/select/")
    useEffect(() => {
        fetchData()
    }, [])


    const columns = [
        { title: "ID", field: "id", type: "numeric" },
        { title: "Seq ID", field: "seq_id", type: "numeric" },
        { title: "File ID", field: "file_id" },
        { title: "Date", field: "date", type: "date" },
        { title: "Time", field: "time" },
        { title: "Ratop", field: "ratop" },
        { title: "ONR", field: "onr" },
        { title: "NR", field: "nr", type: "numeric" },
        { title: "BNR Mask", field: "bnrmask", type: "numeric" },
        { title: "Prt Name", field: "prtname" },
        { title: "Prt Code", field: "prtcode" },
        { title: "Oreg", field: "oreg" },
        { title: "Oreg Name", field: "oregname" },
        { title: "Reg", field: "reg" },
        { title: "Reg Name", field: "regname" },
        { title: "Oopcode", field: "oopcode" },
        { title: "Opcode", field: "opcode" },
        { title: "Contract Code", field: "contractcode" },
        { title: "GW Name", field: "gwname" },
        { title: "Cust Name", field: "custname" },
        { title: "Location", field: "location" },
        { title: "Location1", field: "location1" },
        { title: "Amount", field: "amount", type: "numeric" },
        { title: "Unit", field: "unit" },
        { title: "Rated", field: "rated" },
        { title: "CSC", field: "csc", type: "numeric" },
        { title: "Rate", field: "rate", type: "numeric" },
        { title: "CSC2", field: "csc2", type: "numeric" },
        { title: "Rate2", field: "rate2", type: "numeric" },
        { title: "Rate Type", field: "ratetype" },
        { title: "Rate ID", field: "rateid" },
        { title: "VAT", field: "vat" },
        { title: "Cust Code", field: "custcode" },
        { title: "Cref ID", field: "cref_id" },
        { title: "Rejection Cause", field: "rejection_cause" },
    ];

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
            <MaterialTable columns={columns} data={dataCRUD} options={{filtering:true, doubleHorizontalScroll:true, columnResizable:true}} icons={tableIcons} />

        </div>
    )



}

export default RejectedTable
