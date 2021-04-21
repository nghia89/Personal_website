using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Mappers
{
    public static class FunctionMapper
    {
        public static FunctionVm ToModel(this Function model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new FunctionVm
                {
                    Icon = model.Icon,
                    Id = model.Id,
                    Name = model.Name,
                    ParentId = model.ParentId,
                    SortOrder = model.SortOrder,
                    Url = model.Url,

                };
            }
        }
        public static Function ToEntity(this FunctionVm model)
        {
            if (model == null)
            {
                return null;
            }
            else
            {
                return new Function
                {
                    Icon = model.Icon,
                    Id = model.Id,
                    Name = model.Name,
                    ParentId = model.ParentId,
                    SortOrder = model.SortOrder,
                    Url = model.Url,
                };
            }
        }
    }
}
