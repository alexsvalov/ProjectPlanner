import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form'

export default function FormDialogFixedCostRatio(props) {
    const { handleGetData, rowId, isOpen, setIsOpen, api, isAdd } =
        props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsOpen(false);
    };


    const [ratioNumAdd, setRatioNumAdd] = React.useState([])
    const [ratioNumEdit, setRatioNumEdit] = React.useState([])
    const [fixedCostEdit, setFixedCostEdit] = React.useState([])

    const [idEdit, setIdEdit] = React.useState([])

    const handleAdd = () => {
        fetch(`/api/` + api, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ratioNum: (ratioNumAdd !== '') ? ratioNumAdd : null,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response not ok!");
                }
                handleGetData();
                return response.json();
            })
            .catch((error) => {
                console.log('error occured: ', error.message)
            })
        handleClose();
    }

    const handleEdit = (id) => {
        fetch(`/api/` + api + '/' + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setFixedCostEdit(responseJson);
                setRatioNumEdit(responseJson.ratioNum);
                setIdEdit(id);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleUpdate = (id) => {
        fetch(`/api/` + api + '/' + id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                startDate: fixedCostEdit.startDate,
                ratioNum: ratioNumEdit,
                finishDate: fixedCostEdit.finishDate,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response not ok!");
                }
                handleGetData();
                return response.json();
            })
            .catch((error) => {
                console.log(error)
            });
        handleClose();
    }

    React.useEffect(() => {
        handleEdit(rowId);
    }, [rowId])

    React.useEffect(() => {
        if (isOpen) {
            handleClickOpen();
        }
    }, [isOpen])

    return (
        <React.Fragment>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle hidden={!isAdd}>Создание нового элемента</DialogTitle>
                <DialogTitle hidden={isAdd}>Редактирование элемента</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="ratioNum"
                        label="Коэффициент общих расходов"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setRatioNumAdd(e.target.value)}
                        hidden={!isAdd}
                    />
                    <TextField
                        focused
                        required
                        margin="dense"
                        id="ratioNum"
                        label="Коэффициент общих расходов"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={ratioNumEdit}
                        onChange={(e) => setRatioNumEdit(e.target.value)}
                        hidden={isAdd}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button
                        onClick={handleAdd}
                        hidden={!isAdd}
                    >Добавить
                    </Button>
                    <Button
                        onClick={() => handleUpdate(idEdit)}
                        hidden={isAdd}
                    >Изменить
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
