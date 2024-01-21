import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form'


export default function FormDialogOrderProduct(props) {
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
            orderNumAdd: '',
            priceNumAdd: '',
            createDateAdd: '',
            execDateAdd: '',
            deliveryCostNumAdd: '',
            customerAdd: null,
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

    async function handleAdd() {
        const response = await fetch(`/api/` + api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderNum: getValues("orderNumAdd"),
                createDate: getValues("createDateAdd"),
                execDate: getValues("execDateAdd"),
                customerId: getValues("customerAdd").id,
                priceNum: getValues("priceNumAdd"),
                deliveryCostNum: getValues("deliveryCostNumAdd") || 0,
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
        handleGetCustomers();
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
                                id="orderNumAddText"
                                label="Номер заказа"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="orderNumAdd"
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
                                id="createDateAddText"
                                label="Дата создания заказа"
                                type="date"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="createDateAdd"
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
                                id="execDateAddText"
                                label="Дата выполнения заказа"
                                type="date"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="execDateAdd"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно к заполнению",
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                            <Autocomplete
                                disablePortal
                                id="combo-box-customer-add"
                                options={customers}
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
                                        id="customerAddText"
                                        label="Заказчик"
                                        variant="standard"
                                    />}
                            />
                        )}
                        name="customerAdd"
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
                                label="Цена заказа"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="priceNumAdd"
                    />
                    <Controller
                        control={control}
                        rules={{
                            min: {
                                value: 0,
                                message: "Стоимость доставки не может быть отрицательной"
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                focused
                                error={!!error}
                                helperText={error?.message}
                                margin="dense"
                                id="deliveryCostNumAddText"
                                label="Стоимость доставки"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                        name="deliveryCostNumAdd"
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