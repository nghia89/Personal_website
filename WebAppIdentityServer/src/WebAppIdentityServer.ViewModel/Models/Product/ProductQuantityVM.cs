namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductQuantityVM
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public string Name { get; set; }
        public string Sku { get; set; }
        public int? SizeId { get; set; }
        public SizeVM Size { get; set; }
        public int? ColorId { get; set; }
        public ColorVM Color { get; set; }
        public int Quantity { get; set; }
        public int QuantitySold { get; set; }
        public string ImageUrl { get; set; }
        public bool AllowPurchaseWhenSoldOut { get; set; }
        public string OptionVariantColor { get; set; }
        public string OptionVariantSize { get; set; }
        public string OptionVariantName { get; set; }
        public decimal Price { get; set; }
    }
}
