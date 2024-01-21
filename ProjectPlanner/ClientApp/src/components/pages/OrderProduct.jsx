import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogOrderProduct from "../modal/FormDialogOrderProduct";
import FormDialogOrderProductEdit from "../modal/FormDialogOrderProductEdit";
import ContentRegistry from "../content/ContentRegistry";


export default function OrderProduct() {
    const headCells = [
        {
            id: 'index',
            numeric: true,
            disablePadding: false,
            label: '#',
        },
        {
            id: 'orderNum',
            numeric: false,
            disablePadding: false,
            label: 'Номер заказа',
        },

        {
            id: 'createDate',
            numeric: false,
            disablePadding: false,
            label: 'Дата создания',
        },
        {
            id: 'execDate',
            numeric: false,
            disablePadding: false,
            label: 'Дата выполнения',
        },
        {
            id: 'customerName',
            numeric: false,
            disablePadding: false,
            label: 'Заказчик',
        },
        {
            id: 'priceNum',
            numeric: true,
            disablePadding: false,
            label: 'Цена заказа без НДС',
        },
        {
            id: 'deliveryCostNum',
            numeric: true,
            disablePadding: false,
            label: 'Стоимость доставки без НДС',
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
            name: 'orderNum',
            align: 'left'
        },
        {
            id: 2,
            name: 'createDateStr',
            align: 'left'
        },
        {
            id: 3,
            name: 'execDateStr',
            align: 'left'
        },
        {
            id: 4,
            name: 'customerName',
            align: 'left'
        },
        {
            id: 5,
            name: 'priceStr',
            align: 'right'
        },
        {
            id: 6,
            name: 'deliveryCostStr',
            align: 'right'
        },
    ];

    const api = 'OrderProducts'
    const registry = 'Заказы'
    const entityLink = '/order/'

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            Modal={FormDialogOrderProduct}
            ModalEdit={FormDialogOrderProductEdit}
            headCells={headCells}
            atrs={atrs}
            api={api}            
            registry={registry}
            entityLink={entityLink}
        >
        </ClippedDrawer>
    );
}