using ProjectPlanner.Model;

namespace ProjectPlanner.DTO
{
    public class ReportPlanProductDTO
    {
        public long Id { get; set; }
        public string? CodeStr { get; set; }
        public string? Name { get; set; }
        public string? TypeName { get; set; }
        public string? KindName { get; set; }
        public string? GroupName { get; set; }
        public bool? IsPurchase { get; set; }
        public string? IsPurchaseStr { get; set; }
        public int Quantity { get; set; }
        public string? QuantityStr { get; set; }
    }
}
