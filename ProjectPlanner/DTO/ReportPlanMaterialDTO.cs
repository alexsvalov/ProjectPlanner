namespace ProjectPlanner.DTO
{
    public class ReportPlanMaterialDTO
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? SizeStr { get; set; }
        public int? LenghtNum { get; set; }
        public string? TypeName { get; set; }
        public string? MarkSteelName { get; set; }
        public string? GroupName { get; set; }
        public decimal Quantity { get; set; }
        public string? QuantityStr { get; set; }
    }
}
