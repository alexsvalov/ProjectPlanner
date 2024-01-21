import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function OrderProductLabel(props) {
    const { productId } = props;

    const [order, setOrder] = React.useState({});

    const fetchData = async () => {
        const response = await fetch(`/api/OrderProducts/${productId}`);
        const result = await response.json();
        console.log(result);
        setOrder(result);
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    return (
        <Stack direction="column">
            <Typography variant="subtitle1" gutterBottom>
                <b>Заказ №{order.orderNum} от {order.createDateStr}</b>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Заказчик: {order.customerName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Дата выполнения: {order.execDateStr}
            </Typography>
        </Stack>
    );
}