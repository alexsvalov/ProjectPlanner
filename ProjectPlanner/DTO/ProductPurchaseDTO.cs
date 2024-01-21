using ProjectPlanner.Model;

namespace ProjectPlanner.DTO
{
    public class ProductPurchaseDTO
    {
        public long Id { get; set; }
        public Product? Product { get; set; }
        public string? CodeStr { get; set; }
        public string? Name { get; set; }
        public string? TypeName { get; set; }
        public string? KindName { get; set; }
        public string? GroupName { get; set; }
        public decimal? PriceNum { get; set; }
        public string? PriceStr { get; set; }


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
