using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class ProductImageMapper
    {
        public static ProductImageVM ToModel(this ProductImages model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductImageVM
                {
                    Id = model.Id,
                    Caption = model.Caption,
                    CreatedBy = model.CreatedBy,
                    DateCreated = model.DateCreated,
                    DateModified = model.DateModified,
                    FileName = model.FileName,
                    Path = model.Path,
                    ProductId = model.ProductId,
                    Size = model.Size,
                    SortOrder = model.SortOrder,
                    Type = model.Type,
                    UpdatedBy = model.UpdatedBy
                };
            }
        }
        public static ProductImages ToEntity(this ProductImageVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new ProductImages
                {
                    Id = model.Id,
                    Caption = model.Caption,
                    CreatedBy = model.CreatedBy,
                    DateCreated = model.DateCreated,
                    DateModified = model.DateModified,
                    FileName = model.FileName,
                    Path = model.Path,
                    ProductId = model.ProductId,
                    Size = model.Size,
                    SortOrder = model.SortOrder,
                    Type = model.Type,
                    UpdatedBy = model.UpdatedBy
                };
            }
        }
    }
}
