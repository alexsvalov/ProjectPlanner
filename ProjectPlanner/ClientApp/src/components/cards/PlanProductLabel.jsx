import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';


export default function PlanProductLabel(props) {
    const { productId } = props;

    const [plan, setPlan] = React.useState({});

    const fetchData = async () => {
        const response = await fetch(`/api/PlanProducts/${productId}`);
        const result = await response.json();
        console.log(result);
        setPlan(result);
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="subtitle1" gutterBottom>
                План производства №{plan.versionNum} от {plan.createDateStr}
            </Typography>
            < Stack direction="row" spacing={2} >
                <Link to={`/report-plan-products/${productId}`} >
                    <Button variant="contained">ИЗДЕЛИЯ</Button>
                </Link>
                <Link to={`/report-plan-details/${productId}`} >
                    <Button variant="contained">ДЕТАЛИ</Button>
                </Link>
                <Link to={`/report-plan-blanks/${productId}`} >
                    <Button variant="contained">ЗАГОТОВКИ</Button>
                </Link>
                <Link to={`/report-plan-purchases/${productId}`} >
                    <Button variant="contained">ПОКУПНЫЕ</Button>
                </Link>
                <Link to={`/report-plan-materials/${productId}`} >
                    <Button variant="contained">МАТЕРИАЛЫ</Button>
                </Link>
            </Stack>
        </Stack>
    );
}