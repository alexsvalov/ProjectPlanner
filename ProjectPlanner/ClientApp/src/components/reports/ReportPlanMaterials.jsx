import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableReport from "../data/EnhancedTableReport";
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
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Наименование материала',
        },
        {
            id: 'sizeStr',
            numeric: false,
            disablePadding: false,
            label: 'Размер материала',
        },
        {
            id: 'lenghtNum',
            numeric: false,
            disablePadding: false,
            label: 'Длина материала',
        },
        {
            id: 'typeName',
            numeric: false,
            disablePadding: false,
            label: 'Тип материала',
        },
        {
            id: 'markSteelName',
            numeric: false,
            disablePadding: false,
            label: 'Марка стали',
        },
        {
            id: 'groupName',
            numeric: false,
            disablePadding: false,
            label: 'Группа материала',
        },
        {
            id: 'quantityStr',
            numeric: true,
            disablePadding: false,
            label: 'Масса материала, кг',
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
            key: "name",
            width: 20,
        },
        {
            header: "Размер материала",
            key: "sizeStr",
            width: 20,
        },

        {
            header: "Длина материала",
            key: "lenghtNum",
            width: 20,
        },
        {
            header: "Тип материала",
            key: "typeName",
            width: 20,
        },
        {
            header: "Марка стали",
            key: "markSteelName",
            width: 20,
        },
        {
            header: "Группа материала",
            key: "groupName",
            width: 20,
        },        
        {
            header: "Масса материала, кг",
            key: "quantity",
            width: 15,
        },
    ];

    const api = 'ReportPlanMaterials'
    const composeName = 'Ведомость материалов'
    const exportName = 'materials'

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