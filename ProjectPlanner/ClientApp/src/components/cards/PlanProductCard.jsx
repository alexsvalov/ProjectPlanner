import * as React from 'react';
import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableCompose from "../data/EnhancedTableCompose";
import BasicTableProductCost from "../data/BasicTableProductCost";
import Box from '@mui/material/Box';
import PlanProductLabel from "./PlanProductLabel";
import ContentPlanCompose from "../content/ContentPlanCompose";


export default function PlanProductCard() {
    const { productId } = useParams();

    const [product, setProduct] = React.useState({});

    const fetchData = async () => {
        const response = await fetch(`/api/PlanProducts/${productId}`);
        const result = await response.json();
        console.log(result);
        setProduct(result);
    }

    React.useEffect(() => {
        fetchData();
    }, [])

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
            id: 'createDateStr',
            numeric: false,
            disablePadding: false,
            label: 'Дата создания',
        },
        {
            id: 'execDateStr',
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
            id: 'priceStr',
            numeric: true,
            disablePadding: false,
            label: 'Цена заказа без НДС',
        },
        //{
        //    id: 'empty',
        //    numeric: true,
        //    disablePadding: false,
        //    label: '',
        //},
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

    const entityLink = '/plan/' + productId
    const addEntityLink = '/add-plan/' + productId

    const composeName = 'Заказы'
    const api = 'PlanComposes'
    const isCompose = true

    const isAddCompose = false;
    const isLinkCompose = true;
    const isSaveCompose = true;

    const isHideQuantityInput = true;

    return (
        <Box>
            <ClippedDrawer
                Content={ContentPlanCompose}
                EnhancedTable={EnhancedTableCompose}

                headCells={headCells}
                atrs={atrs}
                api={api}
                isCompose={isCompose}
                product={product}
                productId={productId}
                isAdd={false}
                ProductLabel={PlanProductLabel}
                composeName={composeName}
                entityLink={entityLink}
                addEntityLink={addEntityLink}

                isAddCompose={isAddCompose}
                isLinkCompose={isLinkCompose}
                isSaveCompose={isSaveCompose}
                isHideQuantityInput={isHideQuantityInput}
            >
            </ClippedDrawer>
        </Box>
    );
}