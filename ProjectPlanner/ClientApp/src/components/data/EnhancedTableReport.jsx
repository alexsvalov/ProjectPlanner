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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import DownloadIcon from '@mui/icons-material/Download';

const ExcelJS = require('exceljs');


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
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
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
    const { numSelected, selected, handleGetData, api, setSelected,
        handleAdd, registry, data, setData, sheetColumns, exportName } = props;

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
                    handleGetData();
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


    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet();

        if (sheetColumns.length === 10)
            sheet.autoFilter = 'A1:J1';
        if (sheetColumns.length === 8)
            sheet.autoFilter = 'A1:H1';
        if (sheetColumns.length === 6)
            sheet.autoFilter = 'A1:F1';

        sheet.columns = sheetColumns;
        data?.map((item, index) => {
            sheet.addRow({
                index: ++index,
                codeStr: item?.codeStr,
                name: item?.name,
                typeName: item?.typeName,
                kindName: item?.kindName,
                groupName: item?.groupName,
                isPurchaseStr: item?.isPurchaseStr,
                quantity: item?.quantity,

                materialName: item?.materialName,
                materialSizeStr: item?.materialSizeStr,
                materialLenghtNum: item?.materialLenghtNum,
                materialTypeName: item?.materialTypeName,
                materialMarkSteelName: item?.materialMarkSteelName,
                materialGroupName: item?.materialGroupName,
                productDetailLenghtNum: item?.productDetailLenghtNum,
                productDetailWidthNum: item?.productDetailWidthNum,

                lenghtNum: item?.lenghtNum,
                markSteelName: item?.markSteelName,
                sizeStr: item?.sizeStr,
            })
        });
        workbook.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = exportName + ".xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
        })
    }


    const [dataFilter, setDataFilter] = React.useState('');
    const [isHiddenSearch, setIsHiddenSearch] = React.useState(true);

    const filterData = (i) => {
        setDataFilter(i);
        setIsHiddenSearch(false);
        if (i == null || i === "") {
            handleGetData();
        } else {
            setData(data.filter(d =>
                (d.addressStr !== undefined && d.addressStr !== null ?
                    d.addressStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.codeStr !== undefined && d.codeStr !== null ?
                    d.codeStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.createDateStr !== undefined && d.createDateStr !== null ?
                    d.createDateStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.customerName !== undefined && d.customerName !== null ?
                    d.customerName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.deliveryCostStr !== undefined && d.deliveryCostStr !== null ?
                    d.deliveryCostStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.execDateStr !== undefined && d.execDateStr !== null ?
                    d.execDateStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.groupName !== undefined && d.groupName !== null ?
                    d.groupName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.innStr !== undefined && d.innStr !== null ?
                    d.innStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.isPurchaseStr !== undefined && d.isPurchaseStr !== null ?
                    d.isPurchaseStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.kindName !== undefined && d.kindName !== null ?
                    d.kindName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.lenghtNum !== undefined && d.lenghtNum !== null ?
                    d.lenghtNum.toString().toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.markSteel !== undefined && d.markSteel !== null ?
                    d.markSteel.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.materialStr !== undefined && d.materialStr !== null ?
                    d.materialStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.name !== undefined && d.name !== null ?
                    d.name.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.orderNum !== undefined && d.orderNum !== null ?
                    d.orderNum.toString().toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.priceStr !== undefined && d.priceStr !== null ?
                    d.priceStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.sizeStr !== undefined && d.sizeStr !== null ?
                    d.sizeStr.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.typeName !== undefined && d.typeName !== null ?
                    d.typeName.toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.versionNum !== undefined && d.versionNum !== null ?
                    d.versionNum.toString().toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.widthNum !== undefined && d.widthNum !== null
                    ? d.widthNum.toString().toLowerCase().includes(i.toLowerCase()) : false) ||
                (d.weightStr !== undefined && d.weightStr !== null ?
                    d.weightStr.toLowerCase().includes(i.toLowerCase()) : false)
            ))
        }
    }

    const clearFilter = () => {
        setDataFilter('');
        setIsHiddenSearch(true);
        handleGetData();
    }

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
                    {registry}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(selected)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Box
                        sx={{
                            mr: 1
                        }}>
                        <Tooltip title="Экспорт в Excel">
                            <IconButton onClick={exportExcelFile} >
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
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
                </Box>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTableReport(props) {

    const { atrs, api, productId, registry, entityLink, sheetColumns, exportName } =
        props;
    const [data, setData] = React.useState([]);

    const handleGetData = async () => {
        const response = await fetch(`/api/` + api + `/${productId}`);
        const result = await response.json();
        console.log(result);
        setData(result);
    }

    //const handleGetData = () => {
    //    fetch(`/api/` + api + `/${productId}`, {
    //        method: "GET",
    //        headers: {
    //            'Content-Type': 'application/json'
    //        },
    //    })
    //        .then(response => { return response.json() })
    //        .then(responseJson => {
    //            setData(responseJson);
    //            console.log(responseJson)
    //        })
    //        .catch((error) => {
    //            console.log(error)
    //        });
    //}

    React.useEffect(() => {
        handleGetData();
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

    const [rowId, setRowId] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(true);

    const handleEdit = (id) => {
        setRowId(id);
        setIsOpen(true);
        setIsAdd(false);
    };

    const handleAdd = () => {
        setIsOpen(true);
        setIsAdd(true);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={selected}
                    setSelected={setSelected}
                    handleGetData={handleGetData}
                    api={api}
                    handleAdd={handleAdd}
                    registry={registry}
                    setData={setData}
                    data={data}
                    sheetColumns={sheetColumns}
                    exportName={exportName}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            headCells={props.headCells} />
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
                                        sx={{ cursor: 'pointer' }}>
                                        <TableCell
                                            align="right"
                                            sx={{ width: 20 }}
                                        >
                                            {++index}
                                        </TableCell>
                                        {atrs.map((atr) => (
                                            <TableCell
                                                key={atr.id}
                                                align={atr.align}>
                                                {row[atr.name] === null ? '' :
                                                    typeof row[atr.name] === 'object' ? row[atr.name][atr.subname] : row[atr.name]}
                                            </TableCell>
                                        ))}

                                        <TableCell></TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}>
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
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
                hidden={true} />
        </Box>
    );
}