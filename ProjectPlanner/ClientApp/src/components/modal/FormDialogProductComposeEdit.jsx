import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form'


export default function FormDialogProductComposeEdit(props) {
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
            codeStrEdit: '',
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
    const [kindIdEdit, setKindIdIdEdit] = React.useState([])
    const [groupIdEdit, setGroupIdEdit] = React.useState([])

    const [types, setTypes] = React.useState([]);
    const [kinds, setKinds] = React.useState([]);
    const [groups, setGroups] = React.useState([]);

    async function handleGetTypes() {
        const response = await fetch("/api/ProductTypeExcludeDetailDicts", {
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

    const [inputProductType, setInputProductType] = React.useState("");
    const [valueProductType, setValueProductType] = React.useState(null);

    async function handleGetProductType(id) {
        const response = await fetch(`/api/ProductTypeDicts/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setInputProductType(result.name);
        setValueProductType(result);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const [inputProductKind, setInputProductKind] = React.useState("");
    const [valueProductKind, setValueProductKind] = React.useState(null);

    async function handleGetProductKind(id) {
        const response = await fetch(`/api/ProductKindDicts/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setInputProductKind(result.name);
        setValueProductKind(result);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const [inputProductGroup, setInputProductGroup] = React.useState("");
    const [valueProductGroup, setValueProductGroup] = React.useState(null);

    async function handleGetProductGroup(id) {
        const response = await fetch(`/api/ProductGroupDicts/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setInputProductGroup(result.name);
        setValueProductGroup(result);

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
        setValue("codeStrEdit", result.codeStr);
        setTypeIdEdit(result.typeId);
        setKindIdIdEdit(result.kindId);
        setGroupIdEdit(result.groupId);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const handleUpdate = () => {
        if (valueProductType === null ||
            valueProductKind === null ||
            valueProductGroup === null)
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
                codeStr: getValues("codeStrEdit").trim(),
                isPurchase: false,
                typeId: valueProductType.id,
                kindId: valueProductKind.id,
                groupId: valueProductGroup.id
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
        handleGetKinds();
        handleGetGroups();
        if (isOpenEdit) {
            handleClickOpen();
        }
    }, [isOpenEdit])

    React.useEffect(() => {
        if (typeIdEdit !== undefined) {
            handleGetProductType(typeIdEdit);
        }
    }, [typeIdEdit, isOpenEdit])

    React.useEffect(() => {
        if (kindIdEdit !== undefined) {
            handleGetProductKind(kindIdEdit);
        }
    }, [kindIdEdit, isOpenEdit])

    React.useEffect(() => {
        if (groupIdEdit !== undefined) {
            handleGetProductGroup(groupIdEdit);
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
                                id="codeStrEditText"
                                label="Обозначение"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="codeStrEdit"
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
                    <Autocomplete
                        disablePortal
                        id="combo-type-edit"
                        options={types}
                        getOptionLabel={(option) => option.name || ''}
                        fullWidth
                        autoSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={valueProductType || null}
                        onChange={(event, newValue) => {
                            setValueProductType(newValue);
                        }}
                        inputValue={inputProductType || ''}
                        onInputChange={(event, newInputValue) => {
                            setInputProductType(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={valueProductType === null}
                                helperText={valueProductType === null ? "Поле обязательно к заполнению" : ""}
                                required
                                focused
                                margin="dense"
                                id="typeEditText"
                                label="Тип изделия"
                                variant="standard"
                            />}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-kind-edit"
                        options={kinds}
                        getOptionLabel={(option) => option.name || ''}
                        fullWidth
                        autoSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={valueProductKind || null}
                        onChange={(event, newValue) => {
                            setValueProductKind(newValue);
                        }}
                        inputValue={inputProductKind || ''}
                        onInputChange={(event, newInputValue) => {
                            setInputProductKind(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={valueProductKind === null}
                                helperText={valueProductKind === null ? "Поле обязательно к заполнению" : ""}
                                required
                                focused
                                margin="dense"
                                id="kindEditText"
                                label="Вид изделия"
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
                        value={valueProductGroup || null}
                        onChange={(event, newValue) => {
                            setValueProductGroup(newValue);
                        }}
                        inputValue={inputProductGroup || ''}
                        onInputChange={(event, newInputValue) => {
                            setInputProductGroup(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={valueProductGroup === null}
                                helperText={valueProductGroup === null ? "Поле обязательно к заполнению" : ""}
                                required
                                focused
                                margin="dense"
                                id="groupEditText"
                                label="Группа изделия"
                                variant="standard"
                            />}
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