import * as React from 'react';
import { useParams } from 'react-router-dom';
import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTableCompose from "../data/EnhancedTableCompose";
import BasicTableProductCost from "../data/BasicTableProductCost";
import Box from '@mui/material/Box';
import ProductLabel from "./ProductLabel";
import ContentCompose from "../content/ContentCompose";


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
            id: 'componentCodeStr',
            numeric: false,
            disablePadding: false,
            label: 'Обозначение',
        },
        {
            id: 'componentName',
            numeric: false,
            disablePadding: false,
            label: 'Наименование',
        },
        {
            id: 'componentTypeName',
            numeric: false,
            disablePadding: false,
            label: 'Тип изделия',
        },
        {
            id: 'componentKindName',
            numeric: false,
            disablePadding: false,
            label: 'Вид изделия',
        },
        {
            id: 'componentGroupName',
            numeric: false,
            disablePadding: false,
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
            name: 'componentCodeStr',
            align: 'left'
        },
        {
            id: 2,
            name: 'componentName',
            align: 'left'
        },
        {
            id: 3,
            name: 'componentTypeName',
            subname: 'name',
            align: 'left'
        },
        {
            id: 4,
            name: 'componentKindName',
            subname: 'name',
            align: 'left'
        },
        {
            id: 5,
            name: 'componentGroupName',
            subname: 'name',
            align: 'left'
        },
    ];

    const apiCost = 'CostProducts'
    const entityLink = '/product/' + productId
    const addEntityLink = '/add-product/' + productId
    const composeName = 'Спецификация изделия'
    const api = 'ProductComposes'    
    const isCompose = true

   /* const apiAddCompose = 'ProductComposes';*/

    const isAddCompose = false;
    const isLinkCompose = true;
    const isSaveCompose = false;

    const isSaveQuantityProduct = true;

    return (
        <Box>
            <ClippedDrawer
                Content={ContentCompose}
                ProductLabel={ProductLabel}
                EnhancedTable={EnhancedTableCompose}
                BasicTable={BasicTableProductCost}
                headCells={headCells}
                atrs={atrs}
                api={api}
                apiCost={apiCost}
                composeName={composeName}
                product={product}
                productId={productId}
                entityLink={entityLink}
                addEntityLink={addEntityLink}
                isAdd={false}
                isCompose={isCompose}
                isAddCompose={isAddCompose}
                isLinkCompose={isLinkCompose}
                isSaveCompose={isSaveCompose}
                isSaveQuantityProduct={isSaveQuantityProduct}
            >
            </ClippedDrawer>
        </Box>
    );
}