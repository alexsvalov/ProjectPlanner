import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogPlanProduct from "../modal/FormDialogPlanProduct";
import FormDialogPlanProductEdit from "../modal/FormDialogPlanProductEdit";
import ContentRegistry from "../content/ContentRegistry";


export default function PlanProduct() {
    const headCells = [
        {
            id: 'index',
            numeric: true,
            disablePadding: false,
            label: '#',
        },
        {
            id: 'versionNum',
            numeric: false,
            disablePadding: false,
            label: 'Версия',
        },
        {
            id: 'createDate',
            numeric: false,
            disablePadding: false,
            label: 'Дата создания',
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: false,
            label: 'Описание',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            label: 'Действие',
        },
    ];

    const atrs = [
        {
            id: 1,
            name: 'versionNum',
            align: 'left'
        },
        {
            id: 2,
            name: 'createDateStr',
            align: 'left'
        },
        {
            id: 3,
            name: 'description',
            align: 'left'
        },
    ];

    const api = 'PlanProducts'
    const registry = 'Планы производства'
    const entityLink = '/plan/'

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            Modal={FormDialogPlanProduct}
            ModalEdit={FormDialogPlanProductEdit}
            headCells={headCells}
            atrs={atrs}
            api={api}            
            registry={registry}
            entityLink={entityLink}
        >
        </ClippedDrawer>
    );
}