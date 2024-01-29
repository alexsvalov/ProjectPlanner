import ClippedDrawer from "../navigation/ClippedDrawer";
import ContentRegistry from "../content/ContentRegistry";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogCustomer from "../modal/FormDialogCustomer";
import FormDialogCustomerEdit from "../modal/FormDialogCustomerEdit";


export default function Customer() {
    const headCells = [
        {
            id: 'index',
            numeric: true,
            disablePadding: false,
            label: '#',
        },
        {
            id: 'innStr',
            numeric: false,
            disablePadding: false,
            label: 'ИНН',
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Наименование',
        },
        {
            id: 'addressStr',
            numeric: false,
            disablePadding: false,
            label: 'Адрес',
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
            name: 'innStr',
            align: 'left'
        },
        {
            id: 2,
            name: 'name',
            align: 'left'
        },
        {
            id: 3,
            name: 'addressStr',
            align: 'left'
        },
    ];

    const api = 'Customers';
    const registry = 'Заказчики';
    const isHideMoreDetails = true;
    const apiValidate = 'ValidateCustomers';

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            headCells={headCells}
            atrs={atrs}
            api={api}
            Modal={FormDialogCustomer}
            ModalEdit={FormDialogCustomerEdit}
            registry={registry}
            isHideMoreDetails={isHideMoreDetails}
            apiValidate={apiValidate}
        >
        </ClippedDrawer>
    );
}