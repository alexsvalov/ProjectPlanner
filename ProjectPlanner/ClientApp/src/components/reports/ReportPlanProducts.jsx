import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableReport from "../data/EnhancedTableReport";
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
            disablePadding: false,
            label: 'Обозначение',
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Наименование',
        },
        {
            id: 'typeName',
            numeric: false,
            disablePadding: false,
            label: 'Тип изделия',
        },
        {
            id: 'kindName',
            numeric: false,
            disablePadding: false,
            label: 'Вид изделия',
        },
        {
            id: 'groupName',
            numeric: false,
            disablePadding: false,
            label: 'Группа изделия',
        },
        {
            id: 'isPurchaseStr',
            numeric: false,
            disablePadding: false,
            label: 'Покупное изделие',
        },
        {
            id: 'quantityStr',
            numeric: true,
            disablePadding: false,
            label: 'Количество, шт.',
        },
        {
            id: 'empty',
            numeric: true,
            disablePadding: false,
            label: '',
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
        {
            name: 'isPurchaseStr',
            align: 'left'
        },
        {
            name: 'quantityStr',
            align: 'right'
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
            key: "isPurchaseStr",
            width: 20,
        },
        {
            header: "Количество, шт.",
            key: "quantity",
            width: 15,
        },
    ];

    const api = 'ReportPlanProducts'
    const composeName = 'План производства изделий'
    const exportName = 'products'

    return (
        <ClippedDrawer
            Content={ContentReport}
            EnhancedTable={EnhancedTableReport}
            atrs={atrs}
            headCells={headCells}
            sheetColumns={sheetColumns}
            api={api}
            registry={composeName}
            productId={productId}
            exportName={exportName}
        >
        </ClippedDrawer>
    );
}