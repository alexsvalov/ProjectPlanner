import ClippedDrawer from "../navigation/ClippedDrawer";
import EnhancedTable from "../data/EnhancedTable";
import FormDialogFixedCostRatio from "../modal/FormDialogFixedCostRatio";
import FormDialogFixedCostRatioEdit from "../modal/FormDialogFixedCostRatioEdit";
import ContentRegistry from "../content/ContentRegistry";


export default function FixedCostRatio() {
    const headCells = [
        {
            id: 'index',
            numeric: true,
            disablePadding: false,
            label: '#',
        },
        {
            id: 'StartDate',
            numeric: false,
            disablePadding: false,
            label: 'Дата начала действия',
        },
        {
            id: 'FinishDate',
            numeric: false,
            disablePadding: false,
            label: 'Дата окончания действия',
        },
        {
            id: 'RatioNum',
            numeric: true,
            disablePadding: false,
            label: 'Коэффициент общих расходов',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            label: 'Действие',
        },
    ];

    const atrs = [
        {
            id: 1,
            name: 'startDateStr',
            align: 'left'
        },
        {
            id: 2,
            name: 'finishDateStr',
            align: 'left'
        },
        {
            id: 3,
            name: 'ratioNum',
            align: 'right'
        },
    ];

    const api = 'FixedCostRatios'
    const registry = 'Коэффициент общих расходов'
    const entityLink = '/fixed-cost/'
    const isHideMoreDetails = true;
    const isHideDelete = true;

    return (
        <ClippedDrawer
            Content={ContentRegistry}
            EnhancedTable={EnhancedTable}
            Modal={FormDialogFixedCostRatio}
            ModalEdit={FormDialogFixedCostRatioEdit}
            headCells={headCells}
            atrs={atrs}
            api={api}
            registry={registry}
            entityLink={entityLink}
            isHideMoreDetails={isHideMoreDetails}
            isHideDelete={isHideDelete}
        >
        </ClippedDrawer>
    );
}