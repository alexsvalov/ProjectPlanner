import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogDict from "../modal/FormDialogDict";
import FormDialogDictEdit from "../modal/FormDialogDictEdit";
import ContentRegistry from "../content/ContentRegistry";


export default function MaterialTypeDict() {
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
            label: 'Наименование',
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
            name: 'name',
            align: 'left'
        },
    ];

    const api = 'MaterialTypeDicts'
    const registry = 'Тип материала'
    const isHideMoreDetails = true;

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            Modal={FormDialogDict}
            ModalEdit={FormDialogDictEdit}
            headCells={headCells}
            atrs={atrs}
            api={api}
            registry={registry}
            isHideMoreDetails={isHideMoreDetails}
        >
        </ClippedDrawer>
    );
}