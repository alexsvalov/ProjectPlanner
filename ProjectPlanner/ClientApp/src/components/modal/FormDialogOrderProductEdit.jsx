import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form'

export default function FormDialogOrderProductEdit(props) {
    const { handleGetData, rowId, isOpenEdit, setIsOpenEdit, api } =
        props;

    const {
        handleSubmit,
        reset,
        control,
        setValue,
        getValues,
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            orderNumEdit: '',
            priceNumEdit: '',
            createDateEdit: '',
            execDateEdit: '',
            deliveryCostNumEdit: '',
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

    const [customerIdEdit, setCustomerIdEdit] = React.useState([])
    const [customers, setCustomers] = React.useState([]);

    async function handleGetCustomers() {
        const response = await fetch("/api/Customers", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setCustomers(result);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const [inputCustomer, setInputCustomer] = React.useState('');
    const [valueCustomer, setValueCustomer] = React.useState(null);

    async function handleGetCustomer(id) {
        const response = await fetch(`/api/Customers/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setInputCustomer(result.name);
        setValueCustomer(result);

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
        setValue("orderNumEdit", result.orderNum);
        setValue("createDateEdit", result.createDate);
        setValue("execDateEdit", result.execDate);
        setValue("priceNumEdit", result.priceNum);
        setValue("deliveryCostNumEdit", result.deliveryCostNum);
        setCustomerIdEdit(result.customerId);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
    }

    const handleUpdate = () => {
        if (valueCustomer === null)
            return

        fetch(`/api/` + api + '/' + rowId.id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: rowId.id,
                isActive: true,
                orderNum: getValues("orderNumEdit"),
                createDate: getValues("createDateEdit"),
                execDate: getValues("execDateEdit"),
                customerId: valueCustomer.id,
                priceNum: getValues("priceNumEdit"),
                deliveryCostNum: getValues("deliveryCostNumEdit") || 0,
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
        handleGetCustomers();
        if (isOpenEdit) {
            handleClickOpen();
        }
    }, [isOpenEdit])

    React.useEffect(() => {
        if (customerIdEdit !== undefined) {
            handleGetCustomer(customerIdEdit);
        }
    }, [customerIdEdit, isOpenEdit])

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
                                value: 10,
                                message: "Превышено максимальное количество символов - 10"
                            },
                            pattern: {
                                value: /^\d+$/,
                                message: "Допускается только целое число"
                            },
                            min: {
                                value: 1,
                                message: "Номер заказа должен быть не менее 1"
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="orderNumEditText"
                                label="Номер заказа"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="orderNumEdit"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="createDateEditText"
                                label="Дата создания заказа"
                                type="date"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="createDateEdit"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                required
                                margin="dense"
                                id="execDateEditText"
                                label="Дата выполнения заказа"
                                type="date"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="execDateEdit"
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-customer-edit"
                        options={customers}
                        getOptionLabel={(option) => option.name || ''}
                        fullWidth
                        autoselect                       
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={valueCustomer || null}
                        onChange={(event, newValue) => {
                            setValueCustomer(newValue);
                        }}
                        inputValue={inputCustomer || ''}
                        onInputChange={(event, newInputValue) => {
                            setInputCustomer(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                error={valueCustomer === null}
                                helperText={valueCustomer === null ? "Поле обязательно к заполнению" : ""}
                                required
                                focused
                                margin="dense"
                                id="customerEditText"
                                label="Заказчик"
                                variant="standard"
                            />}
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                            maxLength: {
                                value: 20,
                                message: "Превышено максимальное количество символов - 20"
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
                                label="Цена заказа"
                                type="numder"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="priceNumEdit"
                    />
                    <Controller
                        control={control}
                        rules={{
                            min: {
                                value: 0,
                                message: "Стоимость доставки не может быть отрицательной"
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
                                id="deliveryCostNumEditText"
                                label="Стоимость доставки"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="deliveryCostNumEdit"
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