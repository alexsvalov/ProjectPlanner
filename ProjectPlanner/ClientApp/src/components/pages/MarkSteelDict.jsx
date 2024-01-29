import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogDict from "../modal/FormDialogDict";
import FormDialogDictEdit from "../modal/FormDialogDictEdit";
import ContentRegistry from "../content/ContentRegistry";

export default function MarkSteelDict() {

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
            id: 3,
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

    const api = 'MarkSteelDicts'
    const registry = 'Марка стали'
    const isHideMoreDetails = true;
    const apiValidate = 'ValidateMarkSteelDicts';

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            headCells={headCells}
            atrs={atrs}
            api={api}
            Modal={FormDialogDict}
            ModalEdit={FormDialogDictEdit}
            registry={registry}
            isHideMoreDetails={isHideMoreDetails}
            apiValidate={apiValidate}
        >
        </ClippedDrawer>
    );
}