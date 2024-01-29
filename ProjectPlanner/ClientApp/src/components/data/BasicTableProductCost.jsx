import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTableProductCost(props) {

    const { productId, dataCost } = props;

    return (
        <TableContainer component={Paper}>            
            <Table sx={{ minWidth: 300 }} aria-label="simple table" size={'small'}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Показатели</TableCell>
                        <TableCell align="right">Сумма, руб.</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="left">Покупные изделия</TableCell>
                        <TableCell align="right">{dataCost.purchaseCostStr}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Материальные затраты</TableCell>
                        <TableCell align="right">{dataCost.materialCostStr}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Стоимость работы</TableCell>
                        <TableCell align="right">{dataCost.labourCostStr}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Постоянные расходы</TableCell>
                        <TableCell align="right">{dataCost.fixedCostStr}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left"><b>Итого себестоимость</b></TableCell>
                        <TableCell align="right"><b>{dataCost.totalCostStr}</b></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}