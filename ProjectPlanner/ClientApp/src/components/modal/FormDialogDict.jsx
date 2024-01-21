import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from 'react-hook-form'


export default function FormDialogDict(props) {
    const { handleGetData, isOpen, setIsOpen, api } =
        props;

    const {
        handleSubmit,
        reset,
        control,
        getValues
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            nameAdd: '',
        },
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsOpen(false);
    };

    async function handleAdd() {
        const response = await fetch(`/api/` + api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: getValues("nameAdd").trim(),
            })
        });
        const result = await response.json();
        console.log(result);
        handleGetData();
        handleClose();
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    };

    React.useEffect(() => {
        reset();
        if (isOpen) {
            handleClickOpen();
        }
    }, [isOpen])

    return (
        <React.Fragment>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Создание нового элемента</DialogTitle>
                <DialogContent>
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            validate: {
                                checkName: async (value) => {
                                    const response = await fetch(`/api/` + api, {
                                        method: "get",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    });
                                    const result = await response.json();
                                    let check = result.find(x =>
                                        x.name.trim().toLowerCase() === value.toLowerCase().trim());
                                    return check === null || check === undefined || "Такой элемент уже есть";
                                },
                                checkEmpty: (value) => {
                                    return value.trim() !== '' || "Поле обязательно к заполнению";
                                }
                            },                            
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                error={!!error}
                                helperText={error?.message}
                                focused
                                required
                                margin="dense"
                                id="nameAddText"
                                label="Наименование"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="nameAdd"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSubmit(handleAdd)}>Добавить</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}