namespace ProjectPlanner.DTO
{
    public class PlanProductDTO
    {
        public long Id { get; set; }
        public int? VersionNum { get; set; }
        public string? CreateDateStr { get; set; }
        public DateOnly? CreateDate { get; set; }
        public string? CustomerNameMax { get; set; }
        public string? PriceTotalStr { get; set; }
        public string? Description { get; set; }        
    }
}
