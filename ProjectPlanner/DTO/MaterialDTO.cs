namespace ProjectPlanner.DTO
{
    public class MaterialDTO
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? SizeStr { get; set; }
        public int? LenghtNum { get; set; }
        public string? TypeName { get; set; }
        public long? TypeId { get; set; }
        public string? MarkSteel { get; set; }
        public long? MarkSteelId { get; set; }
        public string? GroupName { get; set; }
        public long? GroupId { get; set; }
        public decimal? PriceNum { get; set; }
        public string? PriceStr { get; set; }
        public string? MaterialStr { get; set; }        
    }
}
