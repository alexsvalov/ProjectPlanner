import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableCompose from "../data/EnhancedTableCompose";
import Box from '@mui/material/Box';
import ContentAdd from "../content/ContentAdd";


export default function AddOrderProductCompose() {
    const { productId } = useParams();
    //const headCells = [
    //    {
    //        id: 'index',
    //        numeric: true,
    //        disablePadding: false,
    //        label: '#',
    //    },
    //    {
    //        id: 'createDate',
    //        numeric: false,
    //        disablePadding: true,
    //        label: 'Дата создания',
    //    },
    //    {
    //        id: 'execDate',
    //        numeric: false,
    //        disablePadding: true,
    //        label: 'Дата выполнения',
    //    },
    //    {
    //        id: 'customerName',
    //        numeric: false,
    //        disablePadding: true,
    //        label: 'Заказчик',
    //    },
    //    {
    //        id: 'priceNum',
    //        numeric: false,
    //        disablePadding: true,
    //        label: 'Цена заказа без НДС',
    //    },
    //    {
    //        id: 'action',
    //        numeric: false,
    //        disablePadding: false,
    //        label: 'Действие',
    //    },
    //];

    //const atrs = [
    //    {
    //        id: 1,
    //        name: 'createDateStr',
    //        align: 'left'
    //    },
    //    {
    //        id: 2,
    //        name: 'execDateStr',
    //        align: 'left'
    //    },

    //    {
    //        id: 3,
    //        name: 'customerName',
    //        align: 'left'
    //    },
    //    {
    //        id: 4,
    //        name: 'priceNum',
    //        align: 'left'
    //    },
    //];


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

    const api = 'AddOrderComposes';
    const apiAddCompose = 'OrderComposes';
    const entityLink = '/order/' + productId
    const addEntityLink = '/add-order/' + productId

    const isAddCompose = true;
    const isLinkCompose = false;
    const isSaveCompose = true;

    const isPlanProductAdd = false;
    const isOrderProductAdd = true;
    const isProductAdd = false;

    const isHideQuantityInput = true;

    return (
        <Box>
            <ClippedDrawer
                Content={ContentAdd}
                EnhancedTable={EnhancedTableCompose}

                headCells={headCells}
                atrs={atrs}
                api={api}
                productId={productId}
                apiAddCompose={apiAddCompose}
                entityLink={entityLink}
                addEntityLink={addEntityLink}
                isAddCompose={isAddCompose}
                isLinkCompose={isLinkCompose}
                isSaveCompose={isSaveCompose}

                isPlanProductAdd={isPlanProductAdd}
                isOrderProductAdd={isOrderProductAdd}
                isProductAdd={isProductAdd}
                isHideQuantityInput={isHideQuantityInput}
            >
            </ClippedDrawer>
        </Box>
    );
}