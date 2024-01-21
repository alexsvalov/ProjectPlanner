import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from 'react-hook-form'

export default function FormDialogCustomer(props) {
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
            innStrAdd: '',
            addressStrAdd: '',
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
                innStr: getValues("innStrAdd").trim(),
                addressStr: getValues("addressStrAdd").trim(),
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
                    <Controller
                        control={control}
                        rules={{                            
                            required: "Поле обязательно к заполнению",
                            pattern: {
                                value: /^\d{10}$|^\d{12}$/,
                                message: "ИНН должен состоят из 10 или 12 цифр"
                            },
                            validate: {
                                checkName: async (value) => {
                                    const response = await fetch(`/api/` + api, {
                                        method: "get",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    });
                                    const result = await response.json();
                                    let check = result.find(x => x.innStr.trim().toLowerCase() === value.toLowerCase().trim());
                                    return check === null || check === undefined || "Такой ИНН уже есть";
                                },
                                checkEmpty: (value) => {
                                    return value.trim() !== '' || "Поле обязательно к заполнению";
                                }
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="innStrAddText"
                                label="ИНН"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="innStrAdd"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            validate: {
                                checkEmpty: (value) => {
                                    return value.trim() !== '' || "Поле обязательно к заполнению";
                                }
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="addressStrAddText"
                                label="Адрес"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="addressStrAdd"
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