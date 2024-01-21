import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogMaterial from "../modal/FormDialogMaterial";
import FormDialogMaterialEdit from "../modal/FormDialogMaterialEdit";
import ContentRegistry from "../content/ContentRegistry";


export default function Material() {
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
            id: 'sizeStr',
            numeric: false,
            disablePadding: false,
            label: 'Размер',
        },

        {
            id: 'lenghtNum',
            numeric: false,
            disablePadding: false,
            label: 'Длина',
        },

        {
            id: 'typeId',
            numeric: false,
            disablePadding: false,
            label: 'Тип',
        },

        {
            id: 'markSteelId',
            numeric: false,
            disablePadding: false,
            label: 'Марка стали',
        },
        {
            id: 'groupId',
            numeric: false,
            disablePadding: false,
            label: 'Группа',
        },
        {
            id: 'priceNum',
            numeric: true,
            disablePadding: true,
            label: 'Цена за 1т с НДС-20%',
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
        {
            id: 2,
            name: 'sizeStr',
            align: 'left'
        },

        {
            id: 3,
            name: 'lenghtNum',
            align: 'left'
        },
        {
            id: 4,
            name: 'typeName',
            subname: 'name',
            align: 'left'
        },
        {
            id: 5,
            name: 'markSteel',
            subname: 'name',
            align: 'left'
        },
        {
            id: 6,
            name: 'groupName',
            subname: 'name',
            align: 'left'
        },
        {
            id: 7,
            name: 'priceStr',
            subname: 'name',
            align: 'right'
        },
    ];

    const api = 'Materials'
    const registry = 'Материалы'
    const isHideMoreDetails = true;

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            Modal={FormDialogMaterial}
            ModalEdit={FormDialogMaterialEdit}
            headCells={headCells}
            atrs={atrs}
            api={api}            
            registry={registry}
            isHideMoreDetails={isHideMoreDetails}
        >
        </ClippedDrawer>
    );
}