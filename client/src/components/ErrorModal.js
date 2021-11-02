import * as React from 'react';
import {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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

export default function ErrorModal(props) {
    const handleClose = () => {
        console.log("handleClose");
        props.setOpen(false);
    };

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* <Typography id="modal-modal-title" fontSize="3em">
                    Delete list {store.listMarkedForDeletion ? store.listMarkedForDeletion.name : ""}?
                </Typography> */}
                <Alert severity="error" style={{fontSize: "24px"}}>
                    <AlertTitle style={{fontSize: "36px"}}>Error</AlertTitle>
                    {props.errorMessage}
                </Alert>
                <Box style={{textAlign: "center"}}>
                    <Button variant="contained" size="large" style={{fontSize: "24px", marginTop: "30px"}} onClick={handleClose}>Okay</Button>
                </Box>
            </Box>
        </Modal>
    );
}