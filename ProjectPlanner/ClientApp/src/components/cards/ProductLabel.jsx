import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function ProductLabel(props) {
    const { productId } = props;

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


    return (
        <Stack direction="column" spacing={0}>
            <Typography variant="subtitle1" gutterBottom> <b>{product.name}</b> </Typography>
            <Typography variant="subtitle1" gutterBottom> {product.codeStr} </Typography>            
            <Stack direction="row" spacing={1}>
                <Chip label={product.typeName} />
                <Chip label={product.kindName} variant="outlined" />
                <Chip label={product.groupName} variant="outlined" />
            </Stack>
        </Stack>
    );
}