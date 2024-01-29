import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableReport from "../data/EnhancedTableReport";
import ContentReport from "../content/ContentReport";


export default function ReportPlanPurchases() {

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
            name: 'kindName',
            align: 'left'
        },
        {
            name: 'groupName',
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
            header: "Количество, шт.",
            key: "quantity",
            width: 15,
        },
    ];

    const api = 'ReportPlanPurchases'
    const composeName = 'Ведомость покупных изделий'
    const exportName = 'purchases'

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