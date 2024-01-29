import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogProductPurchase from "../modal/FormDialogProductPurchase";
import FormDialogProductPurchaseEdit from "../modal/FormDialogProductPurchaseEdit";
import ContentRegistry from "../content/ContentRegistry";


export default function ProductPurchase() {
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
            id: 'priceNum',
            numeric: true,
            disablePadding: false,
            label: 'Цена без НДС за 1 шт.',
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
        {
            id: 6,
            name: 'priceStr',
            align: 'right'
        },

    ];

    const api = 'ProductPurchases';
    const registry = 'Покупные изделия';
    const entityLink = '/purchase/';
    const isHideMoreDetails = true;
    const apiValidate = 'ValidateProducts';

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            Modal={FormDialogProductPurchase}
            ModalEdit={FormDialogProductPurchaseEdit}
            headCells={headCells}
            atrs={atrs}
            api={api}            
            registry={registry}
            entityLink={entityLink}
            isHideMoreDetails={isHideMoreDetails}
            apiValidate={apiValidate}
        >
        </ClippedDrawer>
    );
}