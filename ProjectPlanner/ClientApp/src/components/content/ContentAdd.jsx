import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function ContentAdd(props) {
    const { EnhancedTable, headCells, atrs, api, productId, 
        entityLink, addEntityLink, apiAddCompose,
        isAddCompose, isLinkCompose, isSaveCompose,

        isProductAdd, isOrderProductAdd, isPlanProductAdd, isHideQuantityInput

    } = props;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar component="main" sx={{ flexGrow: 1, p: 3 }} />
            <EnhancedTable

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
            </EnhancedTable>
        </Box>
    );
}