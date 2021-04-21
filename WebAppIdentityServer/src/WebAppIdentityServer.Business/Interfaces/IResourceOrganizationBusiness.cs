using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IResourceOrganizationBusiness
    {
        Task Add(ResourceOrganizationVM model);
        Task Update(long id,ResourceOrganizationVM model);

        Task Delete(long id);

        Task<(List<ResourceOrganizationVM> data, long totalCount)> GetAllPaging(string keyword, int page, int pageSize);

        Task<ResourceOrganizationVM> GetById(long id);
    }
}
