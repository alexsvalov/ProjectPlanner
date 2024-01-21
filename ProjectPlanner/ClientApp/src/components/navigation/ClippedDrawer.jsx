import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArchiveIcon from '@mui/icons-material/Archive';
import SchemaIcon from '@mui/icons-material/Schema';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ImageAspectRatioIcon from '@mui/icons-material/ImageAspectRatio';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import PolylineIcon from '@mui/icons-material/Polyline';
import LineWeightIcon from '@mui/icons-material/LineWeight';

const drawerWidth = 240;

export default function ClippedDrawer(props) {
    const { EnhancedTable, headCells, atrs, api, Modal, ModalEdit, registry, entityLink, Content,

        BasicTable, ProductLabel, composeName,
        apiCost, product, productId, isAdd,
        isCompose, addEntityLink, apiAddCompose, isHideMoreDetails,

        isAddCompose, isLinkCompose, isSaveCompose,
        isProductAdd, isOrderProductAdd, isPlanProductAdd,
        isHideQuantityInput, isSaveQuantityProduct, sheetColumns } =
        props;

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };     

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Планировщик
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[['Планы производства', "/plan", < SchemaIcon />], ['Заказы', "/order", <SwitchAccountIcon />],
                          ['Составные изделия', "/product", <PolylineIcon />], ['Покупные изделия', "/purchase", <CandlestickChartIcon />],
                          ['Детали', "/detail", <ImageAspectRatioIcon />], ['Материалы', "/material", <LineWeightIcon />]].map((text, index) => (
                              <Link href={text[1]} underline="none">
                                  <ListItem key={text[0]} disablePadding >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {text[2]}
                                            {/*{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                                        </ListItemIcon>
                                        <ListItemText primary={text[0]} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Справочники" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List>
                            {[['Заказчики', "/customer"], ['Группа изделий', "/product-group"], ['Группа материалов', "/material-group"],
                                ['Тип материала', "/material-type"], ['Марка стали', "/mark-steel"], ['Общие расходы', "/fixed-cost"]].map((text, index) => (
                                <Link href={text[1]} underline="none">
                                        <ListItem key={text[0]} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ArchiveIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={text[0]} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Collapse>
                </Box>
            </Drawer>
            <Content
                EnhancedTable={EnhancedTable}
                headCells={headCells}
                atrs={atrs}
                api={api}
                Modal={Modal}
                ModalEdit={ModalEdit}
                registry={registry}

                isCompose={isCompose}
                BasicTable={BasicTable}

                apiCost={apiCost}
                product={product}
                productId={productId}
                isAdd={false}
                ProductLabel={ProductLabel}
                composeName={composeName}
                entityLink={entityLink}
                addEntityLink={addEntityLink}
                apiAddCompose={apiAddCompose}
                isHideMoreDetails={isHideMoreDetails}

                isAddCompose={isAddCompose}
                isLinkCompose={isLinkCompose}
                isSaveCompose={isSaveCompose}
                isProductAdd={isProductAdd}
                isOrderProductAdd={isOrderProductAdd}
                isPlanProductAdd={isPlanProductAdd}
                isHideQuantityInput={isHideQuantityInput}
                isSaveQuantityProduct={isSaveQuantityProduct}
                sheetColumns={sheetColumns}
            >
            </Content>
        </Box>
    );
}
