import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableReport from "../data/EnhancedTableReport";
import Box from '@mui/material/Box';
import ContentReport from "../content/ContentReport";


export default function ReportPlanProducts() {

    const { productId } = useParams();

    const headCells = [
        {
            id: 'index',
            numeric: true,
            disablePadding: false,
            label: '#',
        },
        {
            id: 'codeStr',
            numeric: false,
            disablePadding: true,
            label: 'Обозначение',
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Наименование',
        },
        {
            id: 'typeId',
            numeric: false,
            disablePadding: true,
            label: 'Тип изделия',
        },
        {
            id: 'kindId',
            numeric: false,
            disablePadding: true,
            label: 'Вид изделия',
        },
        {
            id: 'groupId',
            numeric: false,
            disablePadding: true,
            label: 'Группа изделия',
        },
        //{
        //    id: 'isPurchase',
        //    numeric: false,
        //    disablePadding: true,
        //    label: 'Покупное изделие',
        //},
        {
            id: 'quantity',
            numeric: false,
            disablePadding: false,
            label: 'Количество',
        },
    ];

    const atrs = [
        {
            name: 'codeStr',
            align: 'left'
        },
        {
            name: 'name',
            align: 'left'
        },
        {
            name: 'typeName',
            align: 'left'
        },
        {
            name: 'kindName',
            align: 'left'
        },
        {
            name: 'groupName',
            align: 'left'
        },
        //{
        //    name: 'isPurchase',
        //    align: 'left'
        //},
        {
            name: 'quantity',
            align: 'left'
        },
    ];



    const sheetColumns = [
        {
            header: "#",
            key: "index",
        },
        {
            header: "Обозначение",
            key: "codeStr",
            width: 15,
        },
        {
            header: "Наименование",
            key: "name",
            width: 25,
        },

        {
            header: "Тип изделия",
            key: "typeName",
            width: 20,
        },
        {
            header: "Вид изделия",
            key: "kindName",
            width: 20,
        },
        {
            header: "Группа изделия",
            key: "groupName",
            width: 20,
        },
        {
            header: "Покупное изделие",
            key: "purchaseStr",
            width: 20,
        },
        {
            header: "Количество",
            key: "quantity",
            width: 15,
        },
    ];

    const api = 'ReportPlanProducts'
    const composeName = 'План производства изделий'

    return (
        <ClippedDrawer
            Content={ContentReport}
            EnhancedTable={EnhancedTableReport}

            atrs={atrs}
            headCells={headCells}
            sheetColumns={sheetColumns}

            api={api}
            registry={composeName}
            productId={productId}>
        </ClippedDrawer>
    );
}