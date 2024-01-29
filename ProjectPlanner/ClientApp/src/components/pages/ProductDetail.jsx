import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogProductDetail from "../modal/FormDialogProductDetail";
import FormDialogProductDetailEdit from "../modal/FormDialogProductDetailEdit";
import ContentRegistry from "../content/ContentRegistry";


export default function ProductDetail() {
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
            id: 'groupName',
            numeric: false,
            disablePadding: false,
            label: 'Группа изделия',
        },
        {
            id: 'materialStr',
            numeric: false,
            disablePadding: false,
            label: 'Материал',
        },
        {
            id: 'lenghtNum',
            numeric: false,
            disablePadding: false,
            label: 'Длина заготовки',
        },
        {
            id: 'widthNum',
            numeric: false,
            disablePadding: false,
            label: 'Ширина заготовки',
        },
        {
            id: 'weightStr',
            numeric: true,
            disablePadding: false,
            label: 'Масса заготовки',
        },
        {
            id: 'labourRatioStr',
            numeric: true,
            disablePadding: false,
            label: 'Коэффициент трудоемкости',
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
            name: 'groupName',
            align: 'left'
        },

        {
            id: 4,
            name: 'materialStr',
            align: 'left'
        },
        {
            id: 5,
            name: 'lenghtNum',
            align: 'left'
        },
        {
            id: 6,
            name: 'widthNum',
            align: 'left'
        },
        {
            id: 7,
            name: 'weightStr',
            align: 'right'
        },
        {
            id: 8,
            name: 'labourRatioStr',
            align: 'right'
        },
    ];

    const api = 'ProductDetails'
    const registry = 'Детали'
    const isHideMoreDetails = true;
    const apiValidate = 'ValidateProducts';

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            headCells={headCells}
            atrs={atrs}
            api={api}
            Modal={FormDialogProductDetail}
            ModalEdit={FormDialogProductDetailEdit}
            registry={registry}
            isHideMoreDetails={isHideMoreDetails}
            apiValidate={apiValidate}
        >
        </ClippedDrawer>
    );
}