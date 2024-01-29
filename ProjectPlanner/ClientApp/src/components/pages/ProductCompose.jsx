import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogProductCompose from "../modal/FormDialogProductCompose";
import FormDialogProductComposeEdit from "../modal/FormDialogProductComposeEdit";
import ContentRegistry from "../content/ContentRegistry";


export default function ProductCompose() {
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
            id: 'action',
            numeric: true,
            disablePadding: false,
            label: 'Действие',
        },
    ];

    const atrs = [
        {
            id: 1,
            name: 'codeStr',
            align: 'left'
        },
        {
            id: 2,
            name: 'name',
            align: 'left'
        },
        {
            id: 3,
            name: 'typeName',
            align: 'left'
        },
        {
            id: 4,
            name: 'kindName',
            align: 'left'
        },
        {
            id: 5,
            name: 'groupName',
            align: 'left'
        },
    ];

    const api = 'Products'
    const registry = 'Составные изделия'
    const entityLink = '/product/'
    const apiValidate = 'ValidateProducts';

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            Modal={FormDialogProductCompose}
            ModalEdit={FormDialogProductComposeEdit}
            headCells={headCells}
            atrs={atrs}
            api={api}
            registry={registry}
            entityLink={entityLink}
            apiValidate={apiValidate}
        >
        </ClippedDrawer>
    );
}