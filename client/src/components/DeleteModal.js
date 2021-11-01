import * as React from 'react';
import {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GlobalStoreContext } from '../store'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const style2 = {
    mt: 2,
    display: "flex",
    justifyContent: "space-evenly",
}

export default function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);

    const handleClose = () => {
        store.unmarkListForDeletion();
    };

    const handleDelete = () => {
        store.deleteMarkedList();
    };

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" fontSize="3em">
                    Delete list {store.listMarkedForDeletion ? store.listMarkedForDeletion.name : ""}?
                </Typography>
                <Box sx={style2}  >
                    <Button variant="contained" size="large" style={{fontSize: "24px"}} onClick={handleClose}>No</Button>
                    <Button variant="contained" size="large" style={{fontSize: "24px"}} onClick={handleDelete}>Yes</Button>
                </Box>
            </Box>
        </Modal>
    );
}