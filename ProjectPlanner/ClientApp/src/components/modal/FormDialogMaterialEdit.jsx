import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form'


export default function FormDialogMaterialEdit(props) {
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
            sizeStrEdit: '',
            lenghtNumEdit: '',
            priceNumEdit: '',
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

    const [typeIdEdit, setTypeIdEdit] = React.useState([])
    const [markSteelIdEdit, setMarkSteelIdEdit] = React.useState([])
    const [groupIdEdit, setGroupIdEdit] = React.useState([])

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

    const [inputMaterialType, setInputMaterialType] = React.useState("");
    const [valueMaterialType, setValueMaterialType] = React.useState(null);

    async function handleGetMaterialType(id) {
        const response = await fetch(`/api/MaterialTypeDicts/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setInputMaterialType(result.name);
        setValueMaterialType(result);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const [inputMarkSteel, setInputMarkSteel] = React.useState("");
    const [valueMarkSteel, setValueMarkSteel] = React.useState(null);

    async function handleGetMarkSteel(id) {
        const response = await fetch(`/api/MarkSteelDicts/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setInputMarkSteel(result.name);
        setValueMarkSteel(result);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const [inputMaterialGroup, setInputMaterialGroup] = React.useState("");
    const [valueMaterialGroup, setValueMaterialGroup] = React.useState(null);

    async function handleGetMaterialGroup(id) {
        const response = await fetch(`/api/MaterialGroupDicts/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setInputMaterialGroup(result.name);
        setValueMaterialGroup(result);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

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
        setValue("sizeStrEdit", result.sizeStr);
        setValue("lenghtNumEdit", result.lenghtNum);
        setValue("priceNumEdit", result.priceNum);
        setTypeIdEdit(result.typeId);
        setMarkSteelIdEdit(result.markSteelId);
        setGroupIdEdit(result.groupId);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const handleUpdate = () => {
        if (valueMaterialType === null ||
            valueMarkSteel === null ||
            valueMaterialGroup === null)
            return

        fetch(`/api/` + api + '/' + rowId.id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: rowId.id,
                isActive: true,
                name: getValues("nameEdit").trim(),
                sizeStr: getValues("sizeStrEdit").trim(),
                lenghtNum: getValues("lenghtNumEdit"),
                typeId: valueMaterialType.id,
                markSteelId: valueMarkSteel.id,
                groupId: valueMaterialGroup.id,
                priceNum: getValues("priceNumEdit"),
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
        handleGetTypes();
        handleGetMarkSteels();
        handleGetGroups();
        if (isOpenEdit) {
            handleClickOpen();
        }
    }, [isOpenEdit])

    React.useEffect(() => {
        if (typeIdEdit !== undefined) {
            handleGetMaterialType(typeIdEdit);
        }
    }, [typeIdEdit, isOpenEdit])

    React.useEffect(() => {
        if (markSteelIdEdit !== undefined) {
            handleGetMarkSteel(markSteelIdEdit);
        }
    }, [markSteelIdEdit, isOpenEdit])

    React.useEffect(() => {
        if (groupIdEdit !== undefined) {
            handleGetMaterialGroup(groupIdEdit);
        }
    }, [groupIdEdit, isOpenEdit])

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
                                value: 100,
                                message: "Превышено максимальное количество символов - 100"
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
                                id="sizeStrEditText"
                                label="Размер"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="sizeStrEdit"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            maxLength: {
                                value: 10,
                                message: "Превышено максимальное количество символов - 10"
                            },
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
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="lenghtNumEditText"
                                label="Длина"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="lenghtNumEdit"
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-type-edit"
                        options={types}
                        getOptionLabel={(option) => option.name || ''}
                        fullWidth
                        autoSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={valueMaterialType || null}
                        onChange={(event, newValue) => {
                            setValueMaterialType(newValue);
                        }}
                        inputValue={inputMaterialType || ''}
                        onInputChange={(event, newInputValue) => {
                            setInputMaterialType(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={valueMaterialType === null}
                                helperText={valueMaterialType === null ? "Поле обязательно к заполнению" : ""}
                                required
                                focused
                                margin="dense"
                                id="typeEditText"
                                label="Тип материала"
                                variant="standard"
                            />}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-markSteel-edit"
                        options={markSteels}
                        getOptionLabel={(option) => option.name || ''}
                        fullWidth
                        autoSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={valueMarkSteel || null}
                        onChange={(event, newValue) => {
                            setValueMarkSteel(newValue);
                        }}
                        inputValue={inputMarkSteel || ''}
                        onInputChange={(event, newInputValue) => {
                            setInputMarkSteel(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={valueMarkSteel === null}
                                helperText={valueMarkSteel === null ? "Поле обязательно к заполнению" : ""}
                                required
                                focused
                                margin="dense"
                                id="markSteelEditText"
                                label="Марка стали"
                                variant="standard"
                            />}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-group-edit"
                        options={groups}
                        getOptionLabel={(option) => option.name || ''}
                        fullWidth
                        autoSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={valueMaterialGroup || null}
                        onChange={(event, newValue) => {
                            setValueMaterialGroup(newValue);
                        }}
                        inputValue={inputMaterialGroup || ''}
                        onInputChange={(event, newInputValue) => {
                            setInputMaterialGroup(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={valueMaterialGroup === null}
                                helperText={valueMaterialGroup === null ? "Поле обязательно к заполнению" : ""}
                                required
                                focused
                                margin="dense"
                                id="groupEditText"
                                label="Группа материала"
                                variant="standard"
                            />}
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            maxLength: {
                                value: 10,
                                message: "Превышено максимальное количество символов - 10"
                            },
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
                                id="priceNumEditText"
                                label="Цена за 1 т с НДС-20%"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="priceNumEdit"
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