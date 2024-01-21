namespace ProjectPlanner.DTO
{
    public class CostProductDTO
    {
        public long ProductId { get; set; }
        public string? PurchaseCostStr { get; set; }
        public string? MaterialCostStr { get; set; }
        public string? LabourCostStr { get; set; }
        public string? DeliveryCostStr { get; set; }
        public string? FixedCostStr { get; set; }
        public string? TotalCostStr { get; set; }
    }
}
