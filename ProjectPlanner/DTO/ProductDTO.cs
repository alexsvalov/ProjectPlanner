namespace ProjectPlanner.DTO
{
    public class ProductDTO
    {
        public long Id { get; set; }
        public string? CodeStr { get; set; }
        public string? Name { get; set; }
        public long TypeId { get; set; }
        public string? TypeName { get; set; }
        public string? TypeIdent { get; set; }
        public long KindId { get; set; }
        public string? KindName { get; set; }
        public long GroupId { get; set; }
        public string? GroupName { get; set; }
        public bool? IsPurchase { get; set; }
        public string? IsPurchaseStr { get; set; }
    }
}
