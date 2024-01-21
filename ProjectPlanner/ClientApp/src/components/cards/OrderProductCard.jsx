import * as React from 'react';
import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableCompose from "../data/EnhancedTableCompose";
import BasicTableOrderProductCost from "../data/BasicTableOrderProductCost";
import Box from '@mui/material/Box';
import OrderProductLabel from "./OrderProductLabel";
import ContentOrderProduct from "../content/ContentOrderProduct";


export default function ProductCard() {
    const { productId } = useParams();

    const [product, setProduct] = React.useState({});

    const fetchData = async () => {
        const response = await fetch(`/api/Products/${productId}`);
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
            id: 'productCodeStr',
            numeric: false,
            disablePadding: true,
            label: 'Обозначение',
        },
        {
            id: 'productName',
            numeric: false,
            disablePadding: true,
            label: 'Наименование',
        },
        {
            id: 'productTypeName',
            numeric: false,
            disablePadding: true,
            label: 'Тип изделия',
        },
        {
            id: 'productKindName',
            numeric: false,
            disablePadding: true,
            label: 'Вид изделия',
        },
        {
            id: 'productGroupName',
            numeric: false,
            disablePadding: true,
            label: 'Группа изделия',
        },
        {
            id: 'action',
            numeric: false,
            disablePadding: false,
            label: 'Количество',
        },
    ];

    const atrs = [
        {
            id: 1,
            name: 'productCodeStr',
            align: 'left'
        },
        {
            id: 2,
            name: 'productName',
            align: 'left'
        },
        {
            id: 3,
            name: 'productTypeName',
            align: 'left'
        },
        {
            id: 4,
            name: 'productKindName',
            align: 'left'
        },
        {
            id: 5,
            name: 'productGroupName',
            align: 'left'
        },
    ];

    const apiCost = 'CostOrderProducts'

    const composeName = 'Спецификация заказа'
    const api = 'OrderComposes'
    const entityLink = '/order/' + productId
    const addEntityLink = '/add-order/' + productId 
    const isCompose = true

    const isAddCompose = false;
    const isLinkCompose = true;
    const isSaveCompose = false;

    const isSaveQuantityProduct = false;

    return (
        <Box>
            <ClippedDrawer
                Content={ContentOrderProduct}
                EnhancedTable={EnhancedTableCompose}
                headCells={headCells}
                atrs={atrs}
                api={api}
                isCompose={isCompose}
                BasicTable={BasicTableOrderProductCost}

                apiCost={apiCost}
                product={product}
                productId={productId}
                isAdd={false}
                ProductLabel={OrderProductLabel}
                composeName={composeName}
                entityLink={entityLink}
                addEntityLink={addEntityLink}
                isAddCompose={isAddCompose}
                isLinkCompose={isLinkCompose}
                isSaveCompose={isSaveCompose}
                isSaveQuantityProduct={isSaveQuantityProduct}
            >
            </ClippedDrawer>
        </Box>
    );
}