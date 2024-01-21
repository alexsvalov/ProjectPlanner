import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableCompose from "../data/EnhancedTableCompose";
import Box from '@mui/material/Box';
import ContentAdd from "../content/ContentAdd";


export default function AddPlanProductCompose() {
    const { productId } = useParams();
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
            numeric: false,
            disablePadding: true,
            label: 'Цена заказа без НДС',
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
    ];

    const api = 'AddPlanComposes';
    const apiAddCompose = 'PlanComposes';
    const entityLink = '/plan/' + productId
    const addEntityLink = '/add-plan/' + productId

    const isAddCompose = true;
    const isLinkCompose = false;
    const isSaveCompose = true;

    const isPlanProductAdd = true;
    const isOrderProductAdd = false;
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