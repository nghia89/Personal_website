using System.Collections.Generic;
using System.Linq;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class ProductCategoryMapper
    {
        public static ProductCategoryVM ToModel(this ProductCategory model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductCategoryVM
                {
                    Description = model.Description,
                    SortOrder = model.SortOrder,
                    Id = model.Id,
                    Image = model.Image,
                    Name = model.Name,
                    ParentId = model.ParentId,
                    //Products = model.Products?.Select(a => a.ToModel()),
                    SeoAlias = model.SeoAlias,
                    SeoDescription = model.SeoDescription,
                    SeoKeywords = model.SeoKeywords,
                    Status = model.Status,

                };
            }
        }
        public static ProductCategory ToEntity(this ProductCategoryVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductCategory
                {
                    Description = model.Description,
                    SortOrder = model.SortOrder,
                    Id = model.Id,
                    Image = model.Image,
                    Name = model.Name,
                    ParentId = model.ParentId,
                    //Products = model.Products?.Select(a => a.ToEntity()),
                    SeoAlias = model.SeoAlias,
                    SeoDescription = model.SeoDescription,
                    SeoKeywords = model.SeoKeywords,
                    Status = model.Status,

                };
            }
        }

    }
}
