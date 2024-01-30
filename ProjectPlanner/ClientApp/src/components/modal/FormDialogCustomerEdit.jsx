import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from 'react-hook-form'

export default function FormDialogCustomerEdit(props) {
    const { handleGetData, rowId, isOpenEdit, setIsOpenEdit, api, apiValidate } =
        props;

    const {
        handleSubmit,
        reset,
        control,
        setValue,
        getValues
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            nameEdit: '',
            innStrEdit: '',
            addressStrEdit: '',
        },
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsOpenEdit(false);
    };

    async function handleEdit() {
        const response = await fetch(`/api/` + api + '/' + rowId.id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setValue("nameEdit", result.name);
        setValue("innStrEdit", result.innStr);
        setValue("addressStrEdit", result.addressStr);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const handleUpdate = () => {
        fetch(`/api/` + api + '/' + rowId.id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: rowId.id,
                isActive: true,
                name: getValues("nameEdit").trim(),
                innStr: getValues("innStrEdit").trim(),
                addressStr: getValues("addressStrEdit").trim(),
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response not ok!");
                }
                handleGetData();
            })
            .catch((error) => {
                console.log(error)
            });
        handleClose();
    }

    React.useEffect(() => {
        reset();
        handleGetData();
        handleEdit();
        if (isOpenEdit) {
            handleClickOpen();
        }
    }, [isOpenEdit])

    return (
        <React.Fragment>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Редактирование элемента</DialogTitle>
                <DialogContent>
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            maxLength: {
                                value: 300,
                                message: "Превышено максимальное количество символов - 300"
                            },
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
                                id="nameEditText"
                                label="Наименование"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="nameEdit"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            maxLength: {
                                value: 12,
                                message: "Превышено максимальное количество символов - 12"
                            },
                            pattern: {
                                value: /^\d{10}$|^\d{12}$/,
                                message: "ИНН должен состоят из 10 или 12 цифр"
                            },
                            validate: {
                                checkName: async (value) => {
                                    const response = await fetch(`/api/` + apiValidate + `/` + rowId.id, {
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
                                id="innStrEditText"
                                label="ИНН"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="innStrEdit"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            maxLength: {
                                value: 500,
                                message: "Превышено максимальное количество символов - 500"
                            },
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
                                id="addressStrEditText"
                                label="Адрес"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="addressStrEdit"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSubmit(handleUpdate)}>Изменить</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}