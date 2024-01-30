import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form'

export default function FormDialogProductDetailEdit(props) {
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
            lenghtNumEdit: '',
            weightNumEdit: '',
            labourRatioNumEdit: '',
            widthNumEdit: '',
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

    const [kinds, setKinds] = React.useState([]);
    const [groups, setGroups] = React.useState([]);

    const [valueProductType, setValueProductType] = React.useState(null);

    const [inputProductKind, setInputProductKind] = React.useState("");
    const [valueProductKind, setValueProductKind] = React.useState(null);

    const [inputProductGroup, setInputProductGroup] = React.useState("");
    const [valueProductGroup, setValueProductGroup] = React.useState(null);

    const [inputMaterial, setInputMaterial] = React.useState("");
    const [valueMaterial, setValueMaterial] = React.useState(null);

    const [materialIdEdit, setMaterialIdEdit] = React.useState([])


    async function handleGetMaterial(id) {
        const response = await fetch(`/api/Materials/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setInputMaterial(result.materialStr);
        setValueMaterial(result);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const [productId, setProductId] = React.useState([])
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

    async function handleEdit() {
        setProductId(rowId.productId);
        setValue("nameEdit", rowId.name);
        setValue("codeStrEdit", rowId.codeStr);
        setValueProductType(rowId.type);
        setValueProductKind(rowId.kind);
        setValueProductGroup(rowId.group);
        setMaterialIdEdit(rowId.materialId);

        setValue("lenghtNumEdit", rowId.lenghtNum);
        setValue("widthNumEdit", rowId.widthNum);
        setValue("weightNumEdit", rowId.weightNum);
        setValue("labourRatioNumEdit", rowId.labourRatioNum);
    }

    const handleUpdate = () => {
        if (valueProductType === null ||
            valueProductKind === null ||
            valueProductGroup === null ||
            valueMaterial === null)
            return

        fetch(`/api/` + api + '/' + rowId.id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: rowId.id,
                isActive: true,
                productId: productId,
                materialId: valueMaterial.id,
                lenghtNum: getValues("lenghtNumEdit"),
                widthNum: getValues("widthNumEdit") || null,
                weightNum: getValues("weightNumEdit"),
                labourRatioNum: getValues("labourRatioNumEdit"),
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

        fetch(`/api/Products/` + productId, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: productId,
                isActive: true,
                name: getValues("nameEdit").trim(),
                codeStr: getValues("codeStrEdit").trim(),
                isPurchase: false,
                typeId: valueProductType.id,
                kindId: valueProductKind.id,
                groupId: valueProductGroup.id,
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
        handleGetKinds();
        handleGetGroups();
        handleGetMaterials();

        if (isOpenEdit) {
            handleClickOpen();
        }
        console.log(rowId)
    }, [isOpenEdit])


    React.useEffect(() => {
        if (materialIdEdit !== undefined) {
            handleGetMaterial(materialIdEdit);
        }
    }, [materialIdEdit])

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
                                value: 100,
                                message: "Превышено максимальное количество символов - 100"
                            },
                            validate: {
                                checkCodeStr: async (value) => {
                                    const response = await fetch(`/api/` + apiValidate + `/` + rowId.product.id, {
                                        method: "get",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    });
                                    const result = await response.json();
                                    let check = result.find(x => x.codeStr.trim().toLowerCase() === value.toLowerCase().trim());
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

                    <Autocomplete
                        defaultValue={rowId.material}
                        disablePortal
                        id="combo-material-edit"
                        options={materials}
                        getOptionLabel={(option) => option.materialStr || ''}

                        fullWidth
                        autoSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={valueMaterial || null}
                        onChange={(event, newValue) => {
                            setValueMaterial(newValue);
                        }}
                        inputValue={inputMaterial || ''}
                        onInputChange={(event, newInputValue) => {
                            setInputMaterial(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={valueMaterial === null}
                                helperText={valueMaterial === null ? "Поле обязательно к заполнению" : ""}
                                required
                                focused
                                margin="dense"
                                id="materialEditText"
                                label="Материал"
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
                                label="Длина заготовки"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="lenghtNumEdit"
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
                                id="widthNumEditText"
                                label="Ширина заготовки"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="widthNumEdit"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            min: {
                                value: 0.01,
                                message: "Масса заготовки должна быть не менее 0.01 кг"
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
                                required
                                margin="dense"
                                id="weightNumEditText"
                                label="Масса заготовки"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="weightNumEdit"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
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
                                required
                                margin="dense"
                                id="labourRatioNumEditText"
                                label="Коэффициент трудоемкости"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="labourRatioNumEdit"
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