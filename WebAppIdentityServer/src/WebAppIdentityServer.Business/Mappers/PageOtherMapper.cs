using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Infrastructure.Helpers;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class PageOtherMapper
    {
        public static PageOtherVM ToModel(this PageOther model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new PageOtherVM
                {
                    Alias = model.Name.ToUnSignString(),
                    CatalogOtherId = model.CatalogOtherId,
                    Content = model.Content,
                    Id = model.Id,
                    Name = model.Name,
                    SortOrder = model.SortOrder

                };
            }
        }
        public static PageOther ToEntity(this PageOtherVM model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new PageOther
                {
                    Alias = model.Name.ToUnSignString(),
                    CatalogOtherId = model.CatalogOtherId,
                    Content = model.Content,
                    Id = model.Id,
                    Name = model.Name,
                    SortOrder = model.SortOrder
                };
            }
        }
    }
}
