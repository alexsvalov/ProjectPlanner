import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form'


export default function FormDialogMaterial(props) {
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
            sizeStrAdd: '',
            lenghtNumAdd: '',
            priceNumAdd: '',
            typeAdd: null,
            markSteelAdd: null,
            groupAdd: null,
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

    const [types, setTypes] = React.useState([]);
    const [markSteels, setMarkSteels] = React.useState([]);
    const [groups, setGroups] = React.useState([]);

    async function handleGetTypes() {
        const response = await fetch("/api/MaterialTypeDicts", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setTypes(result);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    async function handleGetMarkSteels() {
        const response = await fetch("/api/MarkSteelDicts", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setMarkSteels(result);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    async function handleGetGroups() {
        const response = await fetch("/api/MaterialGroupDicts", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setGroups(result);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    async function handleAdd() {
        const response = await fetch(`/api/` + api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: getValues("nameAdd").trim(),
                sizeStr: getValues("sizeStrAdd").trim(),
                lenghtNum: getValues("lenghtNumAdd"),
                typeId: getValues("typeAdd").id,
                markSteelId: getValues("markSteelAdd").id,
                groupId: getValues("groupAdd").id,
                priceNum: getValues("priceNumAdd"),
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
        handleGetTypes();
        handleGetMarkSteels();
        handleGetGroups();
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
                                focused
                                error={!!error}
                                helperText={error?.message}
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
                                id="sizeStrAddText"
                                label="Размер"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="sizeStrAdd"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            pattern: {
                                value: /^\d+$/,
                                message: "Допускается только целое число"
                            },
                            min: {
                                value: 1,
                                message: "Длина должна быть не менее 1"
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                error={!!error}
                                helperText={error?.message}
                                focused
                                required
                                margin="dense"
                                id="lenghtNumAddText"
                                label="Длина"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="lenghtNumAdd"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                            <Autocomplete
                                disablePortal
                                id="combo-box-type-add"
                                options={types}
                                getOptionLabel={(option) => option.name}
                                fullWidth
                                autoSelect
                                onChange={(event, newValue) => {
                                    onChange(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        error={!!error}
                                        helperText={error?.message}
                                        required
                                        focused
                                        margin="dense"
                                        id="typeAddText"
                                        label="Тип материала"
                                        variant="standard"
                                    />}
                            />
                        )}
                        name="typeAdd"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                            <Autocomplete
                                disablePortal
                                id="combo-box-markSteel-add"
                                options={markSteels}
                                getOptionLabel={(option) => option.name}
                                fullWidth
                                autoSelect
                                onChange={(event, newValue) => {
                                    onChange(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        error={!!error}
                                        helperText={error?.message}
                                        required
                                        focused
                                        margin="dense"
                                        id="markSteelAddText"
                                        label="Марка стали"
                                        variant="standard"
                                    />}
                            />
                        )}
                        name="markSteelAdd"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                            <Autocomplete
                                disablePortal
                                id="combo-box-group-add"
                                options={groups}
                                getOptionLabel={(option) => option.name}
                                fullWidth
                                autoSelect
                                onChange={(event, newValue) => {
                                    onChange(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        error={!!error}
                                        helperText={error?.message}
                                        required
                                        focused
                                        margin="dense"
                                        id="groupAddText"
                                        label="Группа материала"
                                        variant="standard"
                                    />}
                            />
                        )}
                        name="groupAdd"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            min: {
                                value: 0,
                                message: "Цена не может быть отрицательной"
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                error={!!error}
                                helperText={error?.message}
                                focused
                                required
                                margin="dense"
                                id="priceNumAddText"
                                label="Цена за 1 т с НДС-20%"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="priceNumAdd"
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