using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class ProductCollectionMapper
    {
        public static ProductCollectionVM ToModel(this ProductCollections model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductCollectionVM
                {
                    Description = model.Description,
                    SortOrder = model.SortOrder,
                    Id = model.Id,
                    Images = model.Images,
                    Name = model.Name,
                    SeoAlias = model.SeoAlias,
                    SeoDescription = model.SeoDescription,
                    SeoKeywords = model.SeoKeywords,
                    Status = model.Status,
                };
            }
        }
        public static ProductCollections ToEntity(this ProductCollectionVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductCollections
                {
                    Description = model.Description,
                    SortOrder = model.SortOrder,
                    Id = model.Id,
                    Images = model.Images,
                    Name = model.Name,
                    SeoAlias = model.SeoAlias,
                    SeoDescription = model.SeoDescription,
                    SeoKeywords = model.SeoKeywords,
                    Status = model.Status,

                };
            }
        }

    }
}
