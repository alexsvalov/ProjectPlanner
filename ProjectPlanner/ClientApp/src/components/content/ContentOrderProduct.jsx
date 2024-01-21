import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';


export default function ContentOrderProduct(props) {
    const { EnhancedTable, BasicTable, ProductLabel, composeName,
        headCells, atrs, api, atrsCost, apiCost, product, productId, isAdd,
        isCompose, entityLink, addEntityLink, apiAddCompose,
        isAddCompose, isLinkCompose, isSaveCompose, isSaveQuantityProduct        
    } = props;


    const [dataCost, setDataCost] = React.useState([]);

    async function handleGetDataBasicTableProduct() {
        const response = await fetch(`/api/CostOrderProducts/` + productId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        setDataCost(result);
    }

    React.useEffect(() => {
        handleGetDataBasicTableProduct();
    }, [])


    return (
        <Box sx={{ flexGrow: 1, margin: 2 }}>
            <Box hidden={isAdd}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Toolbar component="main" sx={{ flexGrow: 1, p: 3 }} />
                    </Grid>
                    <Grid item xs={7}>
                        <ProductLabel
                            productId={productId}
                        >
                        </ProductLabel>
                    </Grid>
                    <Grid item xs={5}>                        
                        <BasicTable
                            dataCost={dataCost}
                        >
                        </BasicTable>                
                    </Grid>
                    <Grid item xs={12}>
                        <EnhancedTable
                            handleGetDataBasicTableProduct={handleGetDataBasicTableProduct}
                            headCells={headCells}
                            atrs={atrs}
                            api={api}
                            productId={productId}
                            apiAddCompose={apiAddCompose}
                            composeName={composeName}
                            entityLink={entityLink}
                            addEntityLink={addEntityLink}
                            isAddCompose={isAddCompose}
                            isLinkCompose={isLinkCompose}
                            isSaveCompose={isSaveCompose}
                            isSaveQuantityProduct={isSaveQuantityProduct}
                        >
                        </EnhancedTable>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}