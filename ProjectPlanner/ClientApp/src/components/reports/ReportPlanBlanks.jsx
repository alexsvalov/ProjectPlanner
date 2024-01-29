import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableReport from "../data/EnhancedTableReport";
import ContentReport from "../content/ContentReport";


export default function ReportPlanBlanks() {

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
            disablePadding: false,
            label: 'Наименование материала',
        },
        {
            id: 'materialSizeStr',
            numeric: false,
            disablePadding: false,
            label: 'Размер материала',
        },
        {
            id: 'materialLenghtNum',
            numeric: false,
            disablePadding: false,
            label: 'Длина материала',
        },
        {
            id: 'materialTypeName',
            numeric: false,
            disablePadding: false,
            label: 'Тип материала',
        },
        {
            id: 'materialMarkSteelName',
            numeric: false,
            disablePadding: false,
            label: 'Марка стали',
        },
        {
            id: 'materialGroupName',
            numeric: false,
            disablePadding: false,
            label: 'Группа материала',
        },
        {
            id: 'productDetailLenghtNum',
            numeric: false,
            disablePadding: false,
            label: 'Длина заготовки',
        },
        {
            id: 'productDetailWidthNum',
            numeric: false,
            disablePadding: false,
            label: 'Ширина заготовки',
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
            name: 'materialName',
            align: 'left'
        },
        {
            name: 'materialSizeStr',
            align: 'left'
        },
        {
            name: 'materialLenghtNum',
            align: 'left'
        },
        {
            name: 'materialTypeName',
            align: 'left'
        },
        {
            name: 'materialMarkSteelName',
            align: 'left'
        },
        {
            name: 'materialGroupName',
            align: 'left'
        },
        {
            name: 'productDetailLenghtNum',
            align: 'left'
        },
        {
            name: 'productDetailWidthNum',
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
            header: "Наименование материала",
            key: "materialName",
            width: 25,
        },
        {
            header: "Размер материала",
            key: "materialSizeStr",
            width: 10,
        },
        {
            header: "Длина материала",
            key: "materialLenghtNum",
            width: 10,
        },
        {
            header: "Тип материала",
            key: "materialTypeName",
            width: 20,
        },
        {
            header: "Марка стали",
            key: "materialMarkSteelName",
            width: 10,
        },
        {
            header: "Группа материала",
            key: "materialGroupName",
            width: 20,
        },
        {
            header: "Длина заготовки",
            key: "productDetailLenghtNum",
            width: 10,
        },
        {
            header: "Ширина заготовки",
            key: "productDetailWidthNum",
            width: 10,
        },
        {
            header: "Количество, шт.",
            key: "quantity",
            width: 15,
        },
    ];


    const api = 'ReportPlanBlanks'
    const composeName = 'Ведомость заготовок'
    const exportName = 'blanks'

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