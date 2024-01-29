const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:7339';

const context = [
    "/weatherforecast",
    "/api/Customers",
    "/api/MarkSteelDicts",
    "/api/MaterialGroupDicts",
    "/api/MaterialTypeDicts",
    "/api/ProductTypeDicts",
    "/api/ProductTypeExcludeDetailDicts",    
    "/api/ProductKindDicts",
    "/api/ProductGroupDicts",
    "/api/Materials",
    "/api/PlanProducts",
    "/api/OrderProducts",
    "/api/Products",
    "/api/ProductDetails",
    "/api/ProductPurchases",
    "/api/FixedCostRatios",

    "/api/ProductComposes",
    "/api/OrderComposes",
    "/api/PlanComposes",

    "/api/ReportPlanProducts",
    "/api/ReportPlanDetails",
    "/api/ReportPlanPurchases",
    "/api/ReportPlanBlanks",
    "/api/ReportPlanMaterials",

    "/api/CostOrderProducts",
    "/api/CostProducts",

    "/api/AddProductComposes",
    "/api/AddOrderComposes",
    "/api/AddPlanComposes",


    "/api/ValidateMarkSteelDicts",
    "/api/ValidateMaterialGroupDicts",
    "/api/ValidateMaterialTypeDicts",
    "/api/ValidateCustomers",
    "/api/ValidateProductGroupDicts",
    "/api/ValidateProducts",
];

const onError = (err, req, resp, target) => {
    console.error(`${err.message}`);
}

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    // Handle errors to prevent the proxy middleware from crashing when
    // the ASP NET Core webserver is unavailable
    onError: onError,
    secure: false,
    // Uncomment this line to add support for proxying websockets
    //ws: true, 
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
