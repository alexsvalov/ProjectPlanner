namespace ProjectPlanner.DTO
{
    public class CostOrderProductDTO
    {
        public long OrderProductId { get; set; }
        public string? PurchaseCostStr { get; set; }
        public string? MaterialCostStr { get; set; }
        public string? LabourCostStr { get; set; }
        public string? DeliveryCostStr { get; set; }
        public string? FixedCostStr { get; set; }
        public string? TotalCostStr { get; set; }
        public string? PriceStr { get; set; }
        public string? ProfitStr { get; set; }
    }
}
