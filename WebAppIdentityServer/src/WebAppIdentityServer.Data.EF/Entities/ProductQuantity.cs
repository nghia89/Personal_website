using System;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class ProductQuantity : IDateTracking, IEntityTracking
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public string Name { get; set; }
        public string Sku { get; set; }
        public int? SizeId { get; set; }
        public Size Size { get; set; }
        public int? ColorId { get; set; }
        public Color Color { get; set; }
        public int Quantity { get; set; }
        public int QuantitySold { get; set; }
        public string ImageUrl { get; set; }
        public bool AllowPurchaseWhenSoldOut { get; set; }
        public string OptionVariantColor { get; set; }
        public string OptionVariantSize { get; set; }
        public string OptionVariantName { get; set; }
        public decimal Price { get; set; }

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
    }
}
