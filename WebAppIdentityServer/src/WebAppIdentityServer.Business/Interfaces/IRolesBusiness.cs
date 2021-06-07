using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Utilities;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IRolesBusiness
    {
        Task<IdentityResult> Add(RoleVm model);
        Task<IdentityResult> Update(string id, RoleVm model);
        Task<RoleVm> GetById(string id);
        Task<List<RoleVm>> GetAll();
        Task<bool> Delete(string id);
        Task<PagedResult<RoleVm>> Paging(PagingParamModel pagingParam);
        Task<bool> PutPermissionByRoleId(string roleId, UpdatePermissionRequest model);
    }
}
