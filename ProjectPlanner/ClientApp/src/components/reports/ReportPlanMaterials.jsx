import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableReport from "../data/EnhancedTableReport";
import Box from '@mui/material/Box';
import ContentReport from "../content/ContentReport";


export default function ReportPlanMaterials() {

    const { productId } = useParams();

    const headCells = [
        {
            id: 'index',
            numeric: true,
            disablePadding: false,
            label: '#',
        },
        {
            id: 'materialName',
            numeric: false,
            disablePadding: true,
            label: 'Наименование материала',
        },
        {
            id: 'materialSizeStr',
            numeric: false,
            disablePadding: true,
            label: 'Размер материала',
        },
        {
            id: 'materialLenghtNum',
            numeric: false,
            disablePadding: true,
            label: 'Длина материала',
        },
        {
            id: 'materialTypeName',
            numeric: false,
            disablePadding: true,
            label: 'Тип материала',
        },
        {
            id: 'materialMarkSteelName',
            numeric: false,
            disablePadding: true,
            label: 'Марка стали',
        },
        {
            id: 'materialGroupName',
            numeric: false,
            disablePadding: true,
            label: 'Группа материала',
        },
        {
            id: 'quantity',
            numeric: false,
            disablePadding: false,
            label: 'Количество',
        },
    ];

    const atrs = [
        {
            name: 'name',
            align: 'left'
        },
        {
            name: 'sizeStr',
            align: 'left'
        },
        {
            name: 'lenghtNum',
            align: 'left'
        },
        {
            name: 'typeName',
            align: 'left'
        },
        {
            name: 'markSteelName',
            align: 'left'
        },
        {
            name: 'groupName',
            align: 'left'
        },
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

    const api = 'ReportPlanMaterials'
    const composeName = 'Ведомость материалов'

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