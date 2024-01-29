import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form'


export default function FormDialogProductPurchase(props) {
    const { handleGetData, isOpen, setIsOpen, api } =
        props;

    const {
        handleSubmit,
        reset,
        control,
        getValues,
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            nameAdd: '',
            codeStrAdd: '',
            isPurchaseAdd: true,
            typeAdd: null,
            kindAdd: null,
            groupAdd: null,            
            priceNumAdd: '',
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
    const [kinds, setKinds] = React.useState([]);
    const [groups, setGroups] = React.useState([]);

    async function handleGetTypes() {
        const response = await fetch("/api/ProductTypeDicts", {
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

    async function handleGetKinds() {
        const response = await fetch("/api/ProductKindDicts", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setKinds(result);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    async function handleGetGroups() {
        const response = await fetch("/api/ProductGroupDicts", {
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

    async function handleAddProductPurchase() {
        const response = await fetch(`/api/` + api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: {
                    name: getValues("nameAdd").trim(),
                    codeStr: getValues("codeStrAdd").trim(),
                    isPurchase: true,
                    typeId: getValues("typeAdd").id,
                    kindId: getValues("kindAdd").id,
                    groupId: getValues("groupAdd").id,
                },
                productPurchase: {
                    priceNum: getValues("priceNumAdd"),
                },
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
    }

    React.useEffect(() => {
        reset();
        handleGetTypes();
        handleGetKinds();
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
                                checkCodeStr: async (value) => {
                                    const response = await fetch(`/api/` + api, {
                                        method: "get",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    });
                                    const result = await response.json();
                                    let check = result.find(x =>
                                        x.codeStr.trim().toLowerCase() === value.toLowerCase().trim());
                                    return check === null || check === undefined || "Такое обозначение уже есть";
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
                                id="codeStrAddText"
                                label="Обозначение"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="codeStrAdd"
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
                                        label="Тип изделия"
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
                                id="combo-box-kind-add"
                                options={kinds}
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
                                        id="kindAddText"
                                        label="Вид изделия"
                                        variant="standard"
                                    />}
                            />
                        )}
                        name="kindAdd"
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
                                        label="Группа изделия"
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
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="priceNumAddText"
                                label="Цена без НДС за 1 шт."
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
                    <Button onClick={handleClose}>Закрыть
                    </Button>
                    <Button onClick={handleSubmit(handleAddProductPurchase)}>Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}