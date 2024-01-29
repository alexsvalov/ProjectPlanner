import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function ContentRegistry(props) {
    const { headCells, atrs, api, Modal, ModalEdit, registry, entityLink,
        EnhancedTable, isHideMoreDetails, isHideDelete } = props;

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
            <Toolbar />
            <EnhancedTable
                sx={{ flexGrow: 1, p: 0 }}
                headCells={headCells}
                atrs={atrs}
                api={api}
                Modal={Modal}
                ModalEdit={ModalEdit}
                registry={registry}
                entityLink={entityLink}
                isHideMoreDetails={isHideMoreDetails}
                isHideDelete={isHideDelete}
            >
            </EnhancedTable>
        </Box>
    );
}