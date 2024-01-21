using Microsoft.EntityFrameworkCore;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using System.Globalization;


namespace ProjectPlanner.Services
{
    public class CostProductReport
    {
        private readonly DbPlannerContext _context;

        public CostProductReport(DbPlannerContext context)
        {
            _context = context;
        }

        public decimal GetMaterialPrice(long materialId)
        {
            var query =
                from mp in _context.Materials
                where mp.Id == materialId
                select mp.PriceNum;

            return query.FirstOrDefault() / 1200;
        }

        public decimal? CalculatePurchaseCosts(long productId)
        {
            ProductGraph productGraph = new(_context);
            Dictionary<long, int>? purchases = productGraph.CalculateProductPurchases(productId);
            var query =
                from d in purchases
                join pp in _context.ProductPurchases on d.Key equals pp.ProductId
                select d.Value * pp.PriceNum;
            return query?.AsEnumerable().ToList().Sum();
        }

        public decimal? CalculateMaterialCosts(long productId)
        {
            ProductGraph productGraph = new(_context);
            Dictionary<long, int>? details = productGraph.CalculateProductDetails(productId);
            var query =
                from d in details
                join pd in _context.ProductDetails on d.Key equals pd.ProductId
                select d.Value * GetMaterialPrice(pd.MaterialId) * pd.WeightNum;
            return query?.AsEnumerable().ToList().Sum();
        }

        public decimal? CalculateLabourCosts(long productId)
        {
            ProductGraph productGraph = new(_context);
            Dictionary<long, int>? details = productGraph.CalculateProductDetails(productId);
            var query =
                from d in details
                join pd in _context.ProductDetails on d.Key equals pd.ProductId
                select d.Value * GetMaterialPrice(pd.MaterialId) * pd.WeightNum * pd.LabourRatioNum;
            return query?.AsEnumerable().ToList().Sum();
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

        public FixedCostRatio? GetIdCurrentFixedCostsRatio(DateTime requestDate)
        {
            DateTime ut = DateTime.SpecifyKind(requestDate, DateTimeKind.Utc);
            var query =
                from fc in _context.FixedCostRatios
                where fc.StartDate <= ut && ut <= fc.FinishDate
                select fc;
            return query?.FirstOrDefault();
        }

        public CostProductDTO? CalculateCosts(long productId, DateTime requestDate)
        {
            decimal? purchaseCost = CalculatePurchaseCosts(productId);
            decimal? materialCost = CalculateMaterialCosts(productId);
            decimal? labourCost = CalculateLabourCosts(productId);
            decimal? fixedCost = (materialCost + labourCost) * GetFixedCostRatio(requestDate);
            decimal? totalCost = purchaseCost + materialCost + labourCost + fixedCost;

            return new CostProductDTO
            {
                ProductId = productId,
                PurchaseCostStr = purchaseCost?.ToString("N0", new CultureInfo("ru-RU")),
                MaterialCostStr = materialCost?.ToString("N0", new CultureInfo("ru-RU")),
                LabourCostStr = labourCost?.ToString("N0", new CultureInfo("ru-RU")),
                FixedCostStr = fixedCost?.ToString("N0", new CultureInfo("ru-RU")),
                TotalCostStr = totalCost?.ToString("N0", new CultureInfo("ru-RU")),
            };
        }
    }
}