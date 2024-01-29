using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using System.Globalization;

namespace ProjectPlanner.Services
{
    public class PlanProductReport
    {
        private readonly DbPlannerContext _context;

        public PlanProductReport(DbPlannerContext context)
        {
            _context = context;
        }

        public List<ReportPlanProductDTO>? CalculateProductsPlan(long planProductId)
        {
            var query =
                from pc in _context.PlanComposes
                join oc in _context.OrderComposes on pc.OrderProduct.Id equals oc.OrderId
                join p in _context.Products on oc.Product.Id equals p.Id
                join pt in _context.ProductTypeDicts on p.Type.Id equals pt.Id
                join pk in _context.ProductKindDicts on p.Kind.Id equals pk.Id
                join pg in _context.ProductGroupDicts on p.Group.Id equals pg.Id
                where pc.PlanProductId == planProductId
                group new { oc, p, pt, pk, pg } by new
                {
                    p.Id,
                    p.CodeStr,
                    p.Name,
                    p.IsPurchase,
                    TypeName = pt.Name,
                    KindName = pk.Name,
                    GroupName = pg.Name,
                } into g
                select new ReportPlanProductDTO
                {
                    Id = g.Key.Id,
                    CodeStr = g.Key.CodeStr,
                    Name = g.Key.Name,
                    IsPurchase = g.Key.IsPurchase,
                    IsPurchaseStr = g.Key.IsPurchase ? "Да" : "Нет",
                    TypeName = g.Key.TypeName,
                    KindName = g.Key.KindName,
                    GroupName = g.Key.GroupName,
                    Quantity = g.Sum(x => x.oc.QuantityNum),
                    QuantityStr = g.Sum(x => x.oc.QuantityNum).ToString("N0", new CultureInfo("ru-RU")),
                };

            return query?.ToList();
        }

        public List<ReportPlanProductDTO>? CalculateDetailsOrPurchasesPlan(long planProductId, ProductGraphLeavesEnum leaf)
        {
            Dictionary<long, int>? products = CalculateProductsPlan(planProductId)?
                                                .ToDictionary(x => x.Id, x => x.Quantity);
            ProductGraph productGraph = new(_context);
            Dictionary<long, int> result = new();

            if (products != null)
            {
                foreach (KeyValuePair<long, int> item in products)
                {
                    Dictionary<long, int> leaves = new();

                    if (leaf == ProductGraphLeavesEnum.DETAIL)
                        leaves = productGraph.CalculateProductDetailsOrPurchases(
                            new KeyValuePair<long, int>(item.Key, item.Value), ProductGraphLeavesEnum.DETAIL);
                    if (leaf == ProductGraphLeavesEnum.PURCHASE)
                        leaves = productGraph.CalculateProductDetailsOrPurchases(
                            new KeyValuePair<long, int>(item.Key, item.Value), ProductGraphLeavesEnum.PURCHASE);

                    foreach (KeyValuePair<long, int> it in leaves)
                    {
                        if (result.ContainsKey(it.Key))
                        {
                            result[it.Key] += it.Value;
                        }
                        else
                        {
                            result.Add(it.Key, it.Value);
                        }
                    }
                }
            }

            var query =
                from r in result
                join p in _context.Products on r.Key equals p.Id
                join pt in _context.ProductTypeDicts on p.TypeId equals pt.Id
                join pk in _context.ProductKindDicts on p.KindId equals pk.Id
                join pg in _context.ProductGroupDicts on p.GroupId equals pg.Id
                select new ReportPlanProductDTO
                {
                    Id = p.Id,
                    CodeStr = p.CodeStr,
                    Name = p.Name,
                    TypeName = pt.Name,
                    KindName = pk.Name,
                    GroupName = pg.Name,
                    IsPurchase = p.IsPurchase,
                    IsPurchaseStr = p.IsPurchase ? "Да" : "Нет",
                    Quantity = r.Value,
                    QuantityStr = r.Value.ToString("N0", new CultureInfo("ru-RU")),
                };

            return query?.ToList();
        }

        public List<ReportPlanBlankDTO>? CalculateBlanksPlan(long planProductId)
        {
            Dictionary<long, int>? details =
                CalculateDetailsOrPurchasesPlan(planProductId, ProductGraphLeavesEnum.DETAIL)?
                    .ToDictionary(x => x.Id, x => x.Quantity);
            var query =
                from d in details
                join pd in _context.ProductDetails on d.Key equals pd.Product.Id
                join m in _context.Materials on pd.Material.Id equals m.Id
                join mt in _context.MaterialTypeDicts on m.Type.Id equals mt.Id
                join ms in _context.MarkSteelDicts on m.MarkSteel.Id equals ms.Id
                join mg in _context.MaterialGroupDicts on m.Group.Id equals mg.Id
                group new { d, pd } by new
                {
                    m.Id,
                    m.Name,
                    m.SizeStr,
                    MaterialLenghtNum = m.LenghtNum,
                    TypeName = m.Type.Name,
                    MarkSteelName = m.MarkSteel.Name,
                    GroupName = m.Group.Name,
                    ProductDetailLenghtNum = pd.LenghtNum,
                    pd.WidthNum
                } into g
                select new ReportPlanBlankDTO
                {
                    Id = g.Key.Id,
                    MaterialName = g.Key.Name,
                    MaterialSizeStr = g.Key.SizeStr,
                    MaterialLenghtNum = g.Key.MaterialLenghtNum,
                    MaterialTypeName = g.Key.TypeName,
                    MaterialMarkSteelName = g.Key.MarkSteelName,
                    MaterialGroupName = g.Key.GroupName,
                    ProductDetailLenghtNum = g.Key.ProductDetailLenghtNum,
                    ProductDetailWidthNum = g.Key.WidthNum,
                    Quantity = g.Sum(x => x.d.Value),
                    QuantityStr = g.Sum(x => x.d.Value).ToString("N0", new CultureInfo("ru-RU")),
                };
            return query?.ToList();
        }

        public List<ReportPlanMaterialDTO>? CalculateMaterialsPlan(long planProductId)
        {
            Dictionary<long, int>? details = 
                CalculateDetailsOrPurchasesPlan(planProductId, ProductGraphLeavesEnum.DETAIL)?
                    .ToDictionary(x => x.Id, x => x.Quantity);
            var query =
                from d in details
                join pd in _context.ProductDetails on d.Key equals pd.Product.Id
                join m in _context.Materials on pd.Material.Id equals m.Id
                join mt in _context.MaterialTypeDicts on m.Type.Id equals mt.Id
                join ms in _context.MarkSteelDicts on m.MarkSteel.Id equals ms.Id
                join mg in _context.MaterialGroupDicts on m.Group.Id equals mg.Id
                group new { d, pd, m } by new
                {
                    m.Id,
                    m.Name,
                    m.SizeStr,
                    m.LenghtNum,
                    TypeName = m.Type.Name,
                    MarkSteelName = m.MarkSteel.Name,
                    GroupName = m.Group.Name,
                } into g
                select new ReportPlanMaterialDTO
                {
                    Id = g.Key.Id,
                    Name = g.Key.Name,
                    SizeStr = g.Key.SizeStr,
                    LenghtNum = g.Key.LenghtNum,
                    TypeName = g.Key.TypeName,
                    MarkSteelName = g.Key.MarkSteelName,
                    GroupName = g.Key.GroupName,
                    Quantity = g.Sum(x => x.d.Value * x.pd.WeightNum),
                    QuantityStr = g.Sum(x => x.d.Value * x.pd.WeightNum).ToString("N2", new CultureInfo("ru-RU")),
                };
            return query?.ToList();
        } 
    }
}