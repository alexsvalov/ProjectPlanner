import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


export default function ContentReport(props) {
    const { headCells, atrs, api, registry, EnhancedTable, composeName, productId, sheetColumns } = props;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar component="main" sx={{ flexGrow: 1, p: 3 }} />
            <EnhancedTable
                atrs={atrs}
                headCells={headCells}
                api={api}
                registry={registry}
                productId={productId}
                sheetColumns={sheetColumns}
            >
            </EnhancedTable>
        </Box>
    );
}