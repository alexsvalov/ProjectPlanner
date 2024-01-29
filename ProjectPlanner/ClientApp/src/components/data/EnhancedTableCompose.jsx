import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddBoxIcon from '@mui/icons-material/AddBox';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AlertSnackbar = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
        headCells } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, selected, handleGetData, api, setSelected, productId, apiAddCompose,
        handleUpdateQuantityNumList, composeName, entityLink, addEntityLink,
        isAddCompose, isLinkCompose, isSaveCompose, data, setData,
        isPlanProductAdd, isOrderProductAdd, isProductAdd,
        handleGetDataBasicTableProduct } = props;

    const [dataFilter, setDataFilter] = React.useState('');
    const [isHiddenSearch, setIsHiddenSearch] = React.useState(true);

    const filterData = (i) => {
        setDataFilter(i);
        setIsHiddenSearch(false);
        if (i == null || i === "") {
            handleGetData(productId);
        } else {
            setData(data.filter(d =>
                (d.createDateStr !== undefined && d.createDateStr !== null ?
                    d.createDateStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.codeStr !== undefined && d.codeStr !== null ?
                    d.codeStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.customerName !== undefined && d.customerName !== null ?
                    d.customerName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.execDateStr !== undefined && d.execDateStr !== null ?
                    d.execDateStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.groupName !== undefined && d.groupName !== null ?
                    d.groupName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.isPurchaseStr !== undefined && d.isPurchaseStr !== null ?
                    d.isPurchaseStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.componentCodeStr !== undefined && d.componentCodeStr !== null ?
                    d.componentCodeStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.componentGroupName !== undefined && d.componentGroupName !== null ?
                    d.componentGroupName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.componentIsPurchaseStr !== undefined && d.componentIsPurchaseStr !== null ?
                    d.componentIsPurchaseStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.componentKindName !== undefined && d.componentKindName !== null ?
                    d.componentKindName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.componentName !== undefined && d.componentName !== null ?
                    d.componentName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.componentTypeName !== undefined && d.componentTypeName !== null ?
                    d.componentTypeName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.kindName !== undefined && d.kindName !== null ?
                    d.kindName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.name !== undefined && d.name !== null ?
                    d.name.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.orderNum !== undefined && d.orderNum !== null ?
                    d.orderNum.toString().toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.priceStr !== undefined && d.priceStr !== null ?
                    d.priceStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.productCodeStr !== undefined && d.productCodeStr !== null ?
                    d.productCodeStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.productGroupName !== undefined && d.productGroupName !== null ?
                    d.productGroupName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.productIsPurchaseStr !== undefined && d.productIsPurchaseStr !== null ?
                    d.productIsPurchaseStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.productKindName !== undefined && d.productKindName !== null ?
                    d.productKindName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.productName !== undefined && d.productName !== null ?
                    d.productName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.productTypeName !== undefined && d.productTypeName !== null ?
                    d.productTypeName.toLowerCase().includes(i.toLowerCase()) : false) || 
                (d.typeName !== undefined && d.typeName !== null ?
                    d.typeName.toLowerCase().includes(i.toLowerCase()) : false)
            ))
        }
    }

    const clearFilter = () => {
        setDataFilter('');
        setIsHiddenSearch(true);
        handleGetData(productId);
    }

    const handleDelete = (idList) => {
        idList.forEach((id) => {
            fetch(`/api/` + api + '/' + id, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Response not ok!");
                    }
                    handleGetData(productId);
                    handleGetDataBasicTableProduct(productId);
                    return response.json();
                })
                .catch((error) => {
                    if (error.message === "Response not ok!") {

                    }
                    console.log('error occured: ', error.message)
                })
        });
        setSelected([]);
    }

    const handleAddPlanProductCompose = (idList) => {
        idList.forEach((id) => {
            fetch(`/api/` + apiAddCompose, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    planProductId: productId,
                    orderProductId: id,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Response not ok!");
                    }
                    handleGetData(productId);
                    return response.json();
                })
                .catch((error) => {
                    console.log('error occured: ', error.message)
                })
        });
        setSelected([]);
    }

    const handleAddOrderProductCompose = (idList) => {
        idList.forEach((id) => {
            fetch(`/api/` + apiAddCompose, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId: productId,
                    productId: id,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Response not ok!");
                    }
                    handleGetData(productId);
                    return response.json();
                })
                .catch((error) => {
                    console.log('error occured: ', error.message)
                })
        });
        setSelected([]);
    }

    const [openDialog, setOpenDialog] = React.useState(false);
    const [arrayCycle, setArrayCycle] = React.useState([]);

    async function cycle(id) {
        const response = await fetch(`/api/Products/` + id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setArrayCycle([...arrayCycle, result.name + " " + result.codeStr])
        setOpenDialog(true);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        };
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setArrayCycle([]);
    };

    async function handleAddComponent(id) {
        const response = await fetch(`/api/` + apiAddCompose, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId,
                componentId: id,
            })
        });
        const result = await response.json();
        console.log(result);

        if (result.id === 0) {
            cycle(result.componentId);
        }

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            throw new Error(message);
        }
        handleGetData(productId);
    }

    async function handleAddProductCompose(idList) {
        for (const item of idList) {
            await handleAddComponent(item);
        }

        if (arrayCycle.length > 0) {
            console.log(arrayCycle);
            setOpenDialog(true);
        }
        setSelected([]);
    };

    async function handleAddProductCompose(idList) {
        const promises = idList.map(handleAddComponent);
        await Promise.all(promises);

        if (arrayCycle.length > 0) {
            console.log(arrayCycle);
            setOpenDialog(true);
        }
        setSelected([]);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <React.Fragment>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <Alert severity="error">Внимание! Найдена циклическая связь!</Alert>
                        {arrayCycle.join("-----")} - изделие не может быть добавлено в спецификацию
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Закрыть</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} выбран(ы)
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {composeName}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Box>
                    <Box hidden={!isProductAdd}>
                        <Tooltip title="Добавить">
                            <IconButton onClick={() => handleAddProductCompose(selected)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box hidden={!isOrderProductAdd}>
                        <Tooltip title="Добавить">
                            <IconButton onClick={() => handleAddOrderProductCompose(selected)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box hidden={!isPlanProductAdd}>
                        <Tooltip title="Добавить">
                            <IconButton onClick={() => handleAddPlanProductCompose(selected)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box hidden={isAddCompose}>
                        <Tooltip title="Удалить">
                            <IconButton onClick={() => handleDelete(selected)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

            ) : (
                <Stack direction="row" spacing={0.5}>
                    <Tooltip
                        title="Сохранить"
                        hidden={isSaveCompose}
                    >
                        <IconButton
                            aria-label="Save"
                            onClick={handleUpdateQuantityNumList}
                        >
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="Назад"
                        hidden={isLinkCompose}
                    >
                        <Link to={entityLink} replace={true}>
                            <IconButton
                                aria-label="ArrowBack"

                            >
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip
                        title="Добавить"
                        hidden={isAddCompose}
                    >
                        <Link to={addEntityLink} replace={true}>
                            <IconButton
                                aria-label="AddBox"
                            >
                                <AddBoxIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, height: 40 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            inputProps={{ 'aria-label': 'search google maps' }}
                            value={dataFilter} onChange={(e) => filterData(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" hidden={!isHiddenSearch}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" hidden={isHiddenSearch} onClick={clearFilter}>
                            <SearchOffIcon />
                        </IconButton>
                    </Paper>
                </Stack>
            )}



        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTableCompose(props) {

    const { atrs, api, productId, apiAddCompose, composeName, entityLink, addEntityLink,
        isAddCompose, isLinkCompose, isSaveCompose,
        isProductAdd, isOrderProductAdd, isPlanProductAdd,
        isHideQuantityInput, isSaveQuantityProduct,
        handleGetDataBasicTableProduct } =
        props;
    const [data, setData] = React.useState([]);

    const handleGetData = (id) => {
        fetch(`/api/` + api + `/${id}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => { return response.json() })
            .then(responseJson => {
                setData(responseJson);
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleUpdateQuantityNum = (compose) => {
        fetch(`/api/` + api + '/' + compose.id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: compose.id,
                productId: compose.productId,
                componentId: compose.componentId,
                quantityNum: parseInt(compose.quantityNum)
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response not ok!");
                }
                handleGetDataBasicTableProduct(productId);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    function handleUpdateQuantityNumOrderProduct(compose) {
        fetch(`/api/` + api + '/' + compose.id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: compose.id,
                orderId: compose.orderId,
                productId: compose.productId,
                quantityNum: parseInt(compose.quantityNum)
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response not ok!");
                }
                handleGetDataBasicTableProduct(productId);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleUpdateQuantityNumList = () => {
        if (data.findIndex((x) => x.quantityNum.toString().search(/^\d+$/) !== -1) ||
            data.findIndex((x) => x.quantityNum < 1) !== -1) {
            handleClickSnackbarError();
            return
        }

        if (isSaveQuantityProduct) {
            data.forEach((x) => handleUpdateQuantityNum(x));
        }
        else {
            data.forEach((x) => handleUpdateQuantityNumOrderProduct(x));
        }
        handleClickSnackbar();
    };

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    const [openSnackbarError, setOpenSnackbarError] = React.useState(false);

    const handleClickSnackbarError = () => {
        setOpenSnackbarError(true);
    };

    const handleCloseSnackbarError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbarError(false);
    };


    React.useEffect(() => {
        handleGetData(productId);
    }, [])

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, data],
    );


    const editQuantityNum = (rowId, newQuantityNum) => {
        setData(prevState =>
            prevState.map(item =>
                item.id === rowId
                    ? { ...item, quantityNum: newQuantityNum }
                    : item
            )
        )
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={selected}
                    setSelected={setSelected}
                    handleGetData={handleGetData}
                    api={api}
                    apiAddCompose={apiAddCompose}
                    productId={productId}
                    handleUpdateQuantityNumList={handleUpdateQuantityNumList}
                    composeName={composeName}
                    entityLink={entityLink}
                    addEntityLink={addEntityLink}
                    isAddCompose={isAddCompose}
                    isLinkCompose={isLinkCompose}
                    isSaveCompose={isSaveCompose}
                    isProductAdd={isProductAdd}
                    isOrderProductAdd={isOrderProductAdd}
                    isPlanProductAdd={isPlanProductAdd}
                    handleGetDataBasicTableProduct={handleGetDataBasicTableProduct}
                    setData={setData}
                    data={data}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            headCells={props.headCells}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, row.id)}
                                                aria-checked={isItemSelected}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">{++index}</TableCell>
                                        {atrs.map((atr) => (
                                            <TableCell
                                                key={atr.id}
                                                align={atr.align}>
                                                {row[atr.name] === null ? '' :
                                                    typeof row[atr.name] === 'object' ? row[atr.name][atr.subname] : row[atr.name]}
                                            </TableCell>
                                        ))}
                                        <TableCell
                                            hidden={isHideQuantityInput}
                                            padding="checkbox"
                                        >
                                            <TextField
                                                error={!isSaveCompose ? row.quantityNum.toString().search(/^\d+$/) === -1 || row.quantityNum < 1 : false}
                                                helperText={!isSaveCompose ? row.quantityNum.toString()
                                                    .search(/^\d+$/) === -1 || row.quantityNum < 1 ? "Целое число >0" : "" : false}
                                                sx={{ margin: 0, padding: 0 }}
                                                size="small"
                                                onChange={(e) => editQuantityNum(row.id, e.target.value)}
                                                defaultValue={row.quantityNum}
                                                type="number"
                                                min="1"
                                            />
                                        </TableCell>                                        
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 20, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
                hidden={true}
            />
            <React.Fragment>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                    <AlertSnackbar onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Данные обновлены!
                    </AlertSnackbar>
                </Snackbar>
            </React.Fragment>
            <React.Fragment>
                <Snackbar open={openSnackbarError} autoHideDuration={4000} onClose={handleCloseSnackbarError}>
                    <AlertSnackbar onClose={handleCloseSnackbarError} severity="error" sx={{ width: '100%' }}>
                        Ошибка валидации данных!
                    </AlertSnackbar>
                </Snackbar>
            </React.Fragment>
        </Box>
    );
}