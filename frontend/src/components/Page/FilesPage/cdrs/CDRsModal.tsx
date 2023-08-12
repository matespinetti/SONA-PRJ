import React, {forwardRef, useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MaterialTable from "@material-table/core";
import useCrud from "../../../../hooks/useCrud.ts";
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';

interface CDR {
    id: bigint;
    seq_id: bigint;
    file_id: bigint;
    date: string;
    time: string;
    ratop: string;
    onr: string;
    nr: string;
    bnrmask: string;
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
    amount: string;
    unit: string;
    rated: string;
    csc: string;
    rate: string;
    csc2: string;
    rate2: string;
    ratetype: string;
    rateid: string;
    vat: string;
    custcode: string;
    cref_id: string;
    rule_id: string;
}

const CDRsModal = ({ open, onClose, selectedFileId }) => {

    const [cdrsData, setCdrsData] = useState([]); // State to store fetched CDR data

    const { fetchData } = useCrud<CDR>([], `/cdrs/select/?file_id=${selectedFileId}`); // Update the API URL and jwtAxios instance

    const [legend, setLegend] = useState({
        accepted: "Accepted",
        rejected: "Rejected",
    });

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

    useEffect(() => {
        if (open && selectedFileId) {
            fetchData().then((data) => {
                setCdrsData(data);
            });
        }
    }, [open, selectedFileId]);
    const cdrsColumns = [
        { title: "ID", field: "id" },
        { title: "Seq ID", field: "seq_id" },
        { title: "File ID", field: "file_id" },
        { title: "Date", field: "date" },
        { title: "Time", field: "time" },
        { title: "RATOP", field: "ratop" },
        { title: "ONR", field: "onr" },
        { title: "NR", field: "nr" },
        { title: "BNRMASK", field: "bnrmask" },
        { title: "PRTName", field: "prtname" },
        { title: "PRTCode", field: "prtcode" },
        { title: "OReg", field: "oreg" },
        { title: "ORegName", field: "oregname" },
        { title: "Reg", field: "reg" },
        { title: "RegName", field: "regname" },
        { title: "OOPCode", field: "oopcode" },
        { title: "OpCode", field: "opcode" },
        { title: "ContractCode", field: "contractcode" },
        { title: "GWName", field: "gwname" },
        { title: "CustName", field: "custname" },
        { title: "Location", field: "location" },
        { title: "Location1", field: "location1" },
        { title: "Amount", field: "amount" },
        { title: "Unit", field: "unit" },
        { title: "Rated", field: "rated" },
        { title: "CSC", field: "csc" },
        { title: "Rate", field: "rate" },
        { title: "CSC2", field: "csc2" },
        { title: "Rate2", field: "rate2" },
        { title: "RateType", field: "ratetype" },
        { title: "RateID", field: "rateid" },
        { title: "VAT", field: "vat" },
        { title: "CustCode", field: "custcode" },
        { title: "CRefID", field: "cref_id" },
        { title: "RuleID", field: "rule_id" },
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>View CDRs</DialogTitle>
            <DialogContent>
                <div style={{ marginBottom: "16px" }}>
                    <span style={{ color: "green" }}>{legend.accepted}</span>
                    {" - "}
                    <span style={{ color: "red" }}>{legend.rejected}</span>
                </div>
                <MaterialTable
                    title="CDRs"
                    columns={cdrsColumns}
                    data={cdrsData}
                    icons={tableIcons}
                    options={{
                        rowStyle: rowData => ({
                            backgroundColor: rowData.rule_id !== null ? "green" : "red",
                        }),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CDRsModal;
