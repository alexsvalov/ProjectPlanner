using ProjectPlanner.Model;

namespace ProjectPlanner.DTO
{
    public class ChangeProductDTO
    {
        public Product? Product { get; set; }
        public ProductDetail? ProductDetail { get; set; }
        public ProductPurchase? ProductPurchase { get; set; }
        public string? TypeIdent { get; set; }
        public ProductTypeDict? ProductTypeDict { get; set; }
    }
}
