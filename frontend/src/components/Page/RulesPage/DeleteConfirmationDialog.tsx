import Dialog from "@mui/material/Dialog";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DeleteConfirmationDialog = ({open, onClose, onConfirm}) => {
    return (
        <Dialog open={open} onClose={onClose}>

            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this rule?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmationDialog
