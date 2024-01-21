namespace ProjectPlanner.DTO
{
    public class ComposeProductDTO
    {
        public long Id { get; set; }
        public long? ProductId { get; set; }
        public string? ProductCodeStr { get; set; }
        public string? ProductName { get; set; }
        public string? ProductTypeName { get; set; }
        public string? ProductKindName { get; set; }
        public string? ProductGroupName { get; set; }
        public bool? ProductIsPurchase { get; set; }
        public long? ComponentId { get; set; }
        public string? ComponentCodeStr { get; set; }
        public string? ComponentName { get; set; }
        public string? ComponentTypeName { get; set; }
        public string? ComponentKindName { get; set; }
        public string? ComponentGroupName { get; set; }
        public bool? ComponentIsPurchase { get; set; }
        public int? QuantityNum { get; set; }
    }
}
