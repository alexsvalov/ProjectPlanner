import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

//pages
import Customer from "./components/pages/Customer";
import MarkSteelDict from "./components/pages/MarkSteelDict";
import Material from "./components/pages/Material";
import MaterialGroupDict from "./components/pages/MaterialGroupDict";
import MaterialTypeDict from "./components/pages/MaterialTypeDict";
import OrderProduct from "./components/pages/OrderProduct";
import PlanProduct from "./components/pages/PlanProduct";
import ProductCompose from "./components/pages/ProductCompose";
import ProductDetail from "./components/pages/ProductDetail";
import ProductGroupDict from "./components/pages/ProductGroupDict";
import ProductPurchase from "./components/pages/ProductPurchase";
import FixedCostRatio from "./components/pages/FixedCostRatio";

import ProductCard from "./components/cards/ProductCard";
import AddProductCompose from "./components/add/AddProductCompose";

import OrderProductCard from "./components/cards/OrderProductCard";
import AddOrderProductCompose from "./components/add/AddOrderProductCompose";

import PlanProductCard from "./components/cards/PlanProductCard";
import AddPlanProductCompose from "./components/add/AddPlanProductCompose";

import ReportPlanBlanks from "./components/reports/ReportPlanBlanks";
import ReportPlanDetails from "./components/reports/ReportPlanDetails";
import ReportPlanMaterials from "./components/reports/ReportPlanMaterials";
import ReportPlanProducts from "./components/reports/ReportPlanProducts";
import ReportPlanPurchases from "./components/reports/ReportPlanPurchases";


const AppRoutes = [
    //{
    //  index: true,
    //  element: <Home />
    //},
    //{
    //    path: '/counter',
    //    element: <Counter />
    //},
    //{
    //    path: '/fetch-data',
    //    element: <FetchData />
    //},

    {
        index: true,
        element: <Customer />
    },
    {
        path: '/customer',
        element: <Customer />
    },
    {
        path: '/mark-steel',
        element: <MarkSteelDict />
    },
    {
        path: '/material',
        element: <Material />
    },
    {
        path: '/material-group',
        element: <MaterialGroupDict />
    },
    {
        path: '/material-type',
        element: <MaterialTypeDict />
    },
    {
        path: '/order',
        element: <OrderProduct />
    },
    {
        path: '/plan',
        element: <PlanProduct />
    },
    {
        path: '/product',
        element: <ProductCompose />
    },
    {
        path: '/detail',
        element: <ProductDetail />
    },
    {
        path: '/product-group',
        element: <ProductGroupDict />
    },
    {
        path: '/purchase',
        element: <ProductPurchase />
    },
    {
        path: '/fixed-cost',
        element: <FixedCostRatio />
    },  



    {
        path: '/product/:productId',
        element: <ProductCard />
    },

    {
        path: '/add-product/:productId',
        element: <AddProductCompose />
    },

    {
        path: '/order/:productId',
        element: <OrderProductCard />
    },

    {
        path: '/add-order/:productId',
        element: <AddOrderProductCompose />
    },

    {
        path: '/plan/:productId',
        element: <PlanProductCard />
    },

    {
        path: '/add-plan/:productId',
        element: <AddPlanProductCompose />
    },


    {
        path: '/report-plan-blanks/:productId',
        element: <ReportPlanBlanks />
    },
    {
        path: '/report-plan-details/:productId',
        element: <ReportPlanDetails />
    },
    {
        path: '/report-plan-materials/:productId',
        element: <ReportPlanMaterials />
    },
    {
        path: '/report-plan-products/:productId',
        element: <ReportPlanProducts />
    },   
    {
        path: '/report-plan-purchases/:productId',
        element: <ReportPlanPurchases />
    }, 
];

export default AppRoutes;
