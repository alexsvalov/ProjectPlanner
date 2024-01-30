import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form'


export default function FormDialogProductDetail(props) {
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
            isPurchaseAdd: false,
            
            kindAdd: null,
            groupAdd: null,

            materialAdd: null,
            lenghtNumAdd: '',
            widthNumAdd: '',
            weightNumAdd: '',
            labourRatioNumAdd: '',
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

    const [kinds, setKinds] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [materials, setMaterials] = React.useState([]);

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

    async function handleGetMaterials() {
        const response = await fetch(`/api/Materials`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setMaterials(result);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    async function handleAddProductDetail() {
        const response = await fetch(`/api/` + api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: {
                    name: getValues("nameAdd").trim(),
                    codeStr: getValues("codeStrAdd").trim(),
                    isPurchase: false,                    
                    kindId: getValues("kindAdd").id,
                    groupId: getValues("groupAdd").id,
                },
                productDetail: {
                    materialId: getValues("materialAdd").id,
                    lenghtNum: getValues("lenghtNumAdd"),
                    widthNum: getValues("widthNumAdd") || null,
                    weightNum: getValues("weightNumAdd"),
                    labourRatioNum: getValues("labourRatioNumAdd"),
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
        handleGetKinds();
        handleGetGroups();
        handleGetMaterials();
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
                            maxLength: {
                                value: 100,
                                message: "Превышено максимальное количество символов - 100"
                            },
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
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                            <Autocomplete
                                disablePortal
                                id="combo-box-material-add"
                                options={materials}
                                getOptionLabel={(option) => option.materialStr}
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
                                        id="materialAddText"
                                        label="Материал"
                                        variant="standard"
                                    />}
                            />
                        )}
                        name="materialAdd"
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
                                id="lenghtNumAddText"
                                label="Длина заготовки"
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
                            pattern: {
                                value: /^\d+$/,
                                message: "Допускается только целое число"
                            },
                            min: {
                                value: 1,
                                message: "Ширина должна быть не менее 1"
                            },
                            maxLength: {
                                value: 10,
                                message: "Превышено максимальное количество символов - 10"
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                margin="dense"
                                id="widthNumAddText"
                                label="Ширина заготовки"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="widthNumAdd"
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
                                value: 0.01,
                                message: "Масса заготовки должна быть не менее 0.01 кг"
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="weightNumAddText"
                                label="Масса заготовки"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="weightNumAdd"
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
                                value: 1,
                                message: "Коэффициент трудоемкости должен быть не менее 1"
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="labourRatioNumAddText"
                                label="Коэффициент трудоемкости"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="labourRatioNumAdd"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSubmit(handleAddProductDetail)}>Добавить</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}