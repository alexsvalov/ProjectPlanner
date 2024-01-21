namespace ProjectPlanner.DTO
{
    public class OrderProductDTO
    {
        public long Id { get; set; }
        public long? PlanProductId { get; set; }
        public long? OrderProductId { get; set; }
        public int? OrderNum { get; set; }
        public DateOnly? CreateDate { get; set; }
        public string? CreateDateStr { get; set; }
        public DateOnly? ExecDate { get; set; }
        public string? ExecDateStr { get; set; }
        public string? CustomerName { get; set; }
        public long? CustomerId { get; set; }
        public decimal? PriceNum { get; set; }
        public string? PriceStr { get; set; }
        public decimal? DeliveryCostNum { get; set; }
        public string? DeliveryCostStr { get; set; }
    }
}
