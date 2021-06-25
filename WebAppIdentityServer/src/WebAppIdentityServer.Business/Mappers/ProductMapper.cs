using System.Collections.Generic;
using System.Linq;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class ProductMapper
    {
        public static ProductVM ToModel(this Product model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductVM
                {
                    Content = model.Content,
                    Description = model.Description,
                    Id = model.Id,
                    Image = model.Image,
                    Name = model.Name,
                    OriginalPrice = model.OriginalPrice,
                    Price = model.Price,
                    ProductCategory = model.ProductCategory?.ToModel(),
                    ProductCategoryId = model.ProductCategoryId,
                    ProductCategoryName = model.ProductCategory?.Name,
                    Code = model.Code,
                    SeoAlias = model.SeoAlias,
                    Title = model.Title,
                    SeoDescription = model.SeoDescription,
                    SeoKeywords = model.SeoKeywords,
                    Status = model.Status,
                    Tags = model.Tags,
                    ViewCount = model.ViewCount,
                    DateCreated = model.DateCreated,
                    ProductQuantity = model.ProductQuantity?.Select(x => x.ToModel()).ToList(),
                    ProductImages = model.ProductImages?.Select(x => x.ToModel()).ToList()
                };
            }
        }
        public static Product ToEntity(this ProductVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new Product
                {
                    Content = model.Content,
                    Description = model.Description,
                    Id = model.Id,
                    Image = model.Image,
                    Name = model.Name,
                    OriginalPrice = model.OriginalPrice,
                    Price = model.Price,
                    ProductCategory = model.ProductCategory?.ToEntity(),
                    ProductCategoryId = model.ProductCategoryId,
                    Code = model.Code,
                    SeoAlias = model.SeoAlias,
                    Title = model.Title,
                    SeoDescription = model.SeoDescription,
                    SeoKeywords = model.SeoKeywords,
                    Status = model.Status,
                    Tags = model.Tags,
                    ProductTags = new List<ProductTag>()

                };
            }
        }
    }
}
