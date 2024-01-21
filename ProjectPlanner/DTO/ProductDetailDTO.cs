using ProjectPlanner.Model;

namespace ProjectPlanner.DTO
{
    public class ProductDetailDTO
    {
        public long Id { get; set; }
        public string? CodeStr { get; set; }
        public string? Name { get; set; }
        public string? TypeName { get; set; }
        public string? KindName { get; set; }
        public string? GroupName { get; set; }
        public long? MaterialId { get; set; }
        public string? MaterialStr { get; set; }
        public int? LenghtNum { get; set; }
        public int? WidthNum { get; set; }
        public string? WeightStr { get; set; }
        public string? LabourRatioStr { get; set; }
        public decimal? WeightNum { get; set; }
        public decimal? LabourRatioNum { get; set; }
        public Material? Material { get; set; }


        public long? ProductId { get; set; }
        public long? TypeId { get; set; }
        public long? KindId { get; set; }
        public long? GroupId { get; set; }
        public bool? IsPurchase { get; set; }
        public ProductTypeDict? Type { get; set; }
        public ProductGroupDict? Group { get; set; }
        public ProductKindDict? Kind { get; set; }
    }
}
