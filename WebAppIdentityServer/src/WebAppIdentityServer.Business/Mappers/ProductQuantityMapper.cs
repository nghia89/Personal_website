using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class ProductQuantityMapper
    {
        public static ProductQuantityVM ToModel(this ProductQuantity model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductQuantityVM
                {
                    Id = model.Id,
                    ProductId = model.ProductId,
                    AllowPurchaseWhenSoldOut = model.AllowPurchaseWhenSoldOut,
                    ColorId = model.ColorId,
                    ImageUrl = model.ImageUrl,
                    Name = model.Name,
                    Color = model.Color != null ? new ColorVM() { Id = model.Color.Id, Name = model.Color.Name, ColorCode = model.Color.ColorCode } : null,
                    Quantity = model.Quantity,
                    QuantitySold = model.QuantitySold,
                    Size = model.Size != null ? new SizeVM() { Id = model.Size.Id, Name = model.Size.Name } : null,
                    SizeId = model.SizeId,
                    Sku = model.Sku,
                    Price = model.Price,
                    OptionVariantColor = model.OptionVariantColor,
                    OptionVariantName = model.OptionVariantName,
                    OptionVariantSize = model.OptionVariantSize
                };
            }
        }
        public static ProductQuantity ToEntity(this ProductQuantityVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductQuantity
                {
                    Id = model.Id,
                    ProductId = model.ProductId,
                    AllowPurchaseWhenSoldOut = model.AllowPurchaseWhenSoldOut,
                    ColorId = model.ColorId,
                    ImageUrl = model.ImageUrl,
                    Name = model.Name,
                    Quantity = model.Quantity,
                    QuantitySold = model.QuantitySold,
                    SizeId = model.SizeId,
                    Sku = model.Sku,
                    Price = model.Price,
                    OptionVariantColor = model.OptionVariantColor,
                    OptionVariantName = model.OptionVariantName,
                    OptionVariantSize = model.OptionVariantSize
                };
            }
        }
    }
}
