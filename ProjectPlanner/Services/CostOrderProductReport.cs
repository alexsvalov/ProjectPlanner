using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using System.Globalization;

namespace ProjectPlanner.Services
{
    public class CostOrderProductReport
    {
        private readonly DbPlannerContext _context;

        public CostOrderProductReport(DbPlannerContext context)
        {
            _context = context;
        }

        public List<OrderCompose>? GetOrderProductCompose(long orderProductId)
        {
            var query =
                from oc in _context.OrderComposes
                where oc.OrderId == orderProductId
                select new OrderCompose
                {
                    ProductId = oc.ProductId,
                    QuantityNum = oc.QuantityNum
                };
            return query?.ToList();
        }

        public decimal? CalculatePurchaseCosts(long orderProductId)
        {            
            CostProductReport productCosts = new(_context);
            return GetOrderProductCompose(orderProductId)?
                .Select(x => productCosts.CalculatePurchaseCosts(x.ProductId) * x.QuantityNum)
                .Sum();
        }

        public decimal? CalculateMaterialCosts(long orderProductId)
        {
            CostProductReport productCosts = new(_context);
            return GetOrderProductCompose(orderProductId)?
                .Select(x => productCosts.CalculateMaterialCosts(x.ProductId) * x.QuantityNum)
                .Sum();
        }

        public decimal? GetDeliveryCosts(long orderProductId)
        {
            var query =
                from op in _context.OrderProducts
                where op.Id == orderProductId
                select op.DeliveryCostNum;
            return query.FirstOrDefault();
        }

        public decimal? GetOrderProductPrice(long orderProductId)
        {
            var query =
                from op in _context.OrderProducts
                where op.Id == orderProductId
                select op.PriceNum;
            return query.FirstOrDefault();
        }

        public decimal? CalculateLabourCosts(long orderProductId)
        {            
            CostProductReport productCosts = new(_context);
            var query =
                from oc in GetOrderProductCompose(orderProductId)
                select productCosts.CalculateLabourCosts(oc.ProductId) * oc.QuantityNum;
            return query?.Sum();
        }

        public decimal? GetFixedCostRatio(DateTime requestDate)
        {
            DateTime ut = DateTime.SpecifyKind(requestDate, DateTimeKind.Utc);
            var query =
                from fc in _context.FixedCostRatios
                where fc.StartDate <= ut && ut <= fc.FinishDate
                select fc.RatioNum;
            return query?.AsEnumerable().FirstOrDefault(1);
        }

        public CostOrderProductDTO? CalculateCosts(long orderProductId, DateTime requestDate)
        {
            decimal? purchaseCost = CalculatePurchaseCosts(orderProductId);
            decimal? materialCost = CalculateMaterialCosts(orderProductId);
            decimal? labourCost = CalculateLabourCosts(orderProductId);
            decimal? deliveryCost = GetDeliveryCosts(orderProductId);
            decimal? fixedCost = (materialCost + labourCost) * GetFixedCostRatio(requestDate);
            decimal? totalCost = purchaseCost + materialCost + labourCost + fixedCost + deliveryCost;
            decimal? price = GetOrderProductPrice(orderProductId);
            decimal? profit = price - totalCost;

            return new CostOrderProductDTO
            {
                OrderProductId = orderProductId,
                PurchaseCostStr = purchaseCost?.ToString("N0", new CultureInfo("ru-RU")),
                MaterialCostStr = materialCost?.ToString("N0", new CultureInfo("ru-RU")),
                LabourCostStr = labourCost?.ToString("N0", new CultureInfo("ru-RU")),
                DeliveryCostStr = deliveryCost?.ToString("N0", new CultureInfo("ru-RU")),
                FixedCostStr = fixedCost?.ToString("N0", new CultureInfo("ru-RU")),
                TotalCostStr = totalCost?.ToString("N0", new CultureInfo("ru-RU")),
                PriceStr = price?.ToString("N0", new CultureInfo("ru-RU")),
                ProfitStr = profit?.ToString("N0", new CultureInfo("ru-RU")),
            };
        }
    }
}