import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from 'react-hook-form'


export default function FormDialogDictEdit(props) {
    const { handleGetData, rowId, isOpenEdit, setIsOpenEdit, api } =
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
                            validate: {
                                checkName: async (value) => {
                                    const response = await fetch(`/api/` + api, {
                                        method: "get",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    });
                                    const result = await response.json();
                                    let check = result.find(x => x.name.trim().toLowerCase() === value.toLowerCase().trim());
                                    return check === null || check === undefined || "Такой элемент уже есть";
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSubmit(handleUpdate)}>Изменить</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}