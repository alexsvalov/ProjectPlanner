namespace ProjectPlanner.DTO
{
    public class ReportPlanBlankDTO
    {
        public long Id { get; set; }
        public string? MaterialName { get; set; }
        public string? MaterialSizeStr { get; set; }
        public int? MaterialLenghtNum { get; set; }
        public string? MaterialTypeName { get; set; }
        public string? MaterialMarkSteelName { get; set; }
        public string? MaterialGroupName { get; set; }

        public int ProductDetailLenghtNum { get; set; }
        public int? ProductDetailWidthNum { get; set; }                       
        public int Quantity { get; set; }
        public string? QuantityStr { get; set; }
    }
}
