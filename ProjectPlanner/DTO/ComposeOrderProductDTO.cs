namespace ProjectPlanner.DTO
{
    public class ComposeOrderProductDTO
    {
        public long Id { get; set; }
        public long? OrderId { get; set; }
        public int? OrderNum { get; set; }
        public DateOnly? OrderCreateDate { get; set; }
        public DateOnly? OrderExecDate { get; set; }
        public string? OrderCustomerName { get; set; }
        public decimal? OrderPriceNum { get; set; }

        public long? ProductId { get; set; }
        public string? ProductCodeStr { get; set; }
        public string? ProductName { get; set; }
        public string? ProductTypeName { get; set; }
        public string? ProductKindName { get; set; }
        public string? ProductGroupName { get; set; }
        public bool? ProductIsPurchase { get; set; }
        public int? QuantityNum { get; set; }
    }
}
