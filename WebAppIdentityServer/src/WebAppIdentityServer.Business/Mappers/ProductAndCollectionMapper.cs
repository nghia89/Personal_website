using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class ProductAndCollectionMapper
    {
        public static ProductAndCollectionVM ToModel(this ProductAndCollection model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductAndCollectionVM
                {
                    Product = model.Product?.ToModel(),
                    ProductCollectionId = model.ProductCollectionId,
                    ProductId = model.ProductCollectionId
                };
            }
        }
        public static ProductAndCollection ToEntity(this ProductAndCollectionVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductAndCollection
                {
                    Product = model.Product?.ToEntity(),
                    ProductCollectionId = model.ProductCollectionId,
                    ProductId = model.ProductCollectionId
                };
            }
        }

    }
}
