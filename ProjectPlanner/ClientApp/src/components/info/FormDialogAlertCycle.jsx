import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';


export default function FormDialogAlertCycle(props) {

    const [idCycleList, open, setOpen] = props;

    //const handleClickOpen = () => {
    //    setOpen(true);
    //};

    const handleClose = () => {
        setOpen(false);
    };

    //React.useEffect(() => {
    //    if (isOpenCycleAlert) {
    //        handleClickOpen();
    //    }
    //}, [isOpenCycleAlert])

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <Alert severity="error">This is an error Alert.</Alert>

                    {idCycleList}


                    {/*<DialogContentText id="alert-dialog-description">*/}
                    {/*    Let Google help apps determine location. This means sending anonymous*/}
                    {/*    location data to Google, even when no apps are running.*/}
                    {/*</DialogContentText>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
