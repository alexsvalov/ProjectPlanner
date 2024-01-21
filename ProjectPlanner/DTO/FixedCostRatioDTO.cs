namespace ProjectPlanner.DTO
{
    public class FixedCostRatioDTO
    {
        public long Id { get; set; }
        public DateTime StartDate { get; set; }
        public string? StartDateStr { get; set; }
        public DateTime FinishDate { get; set; }
        public string? FinishDateStr { get; set; }
        public string? RatioNum { get; set; }
    }
}
