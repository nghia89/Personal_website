using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Utilities;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IUserBusiness
    {
        Task<IdentityResult> Add(UserVm model);
        Task<IdentityResult> Update(string id, UserVm model);
        Task<IdentityResult> AddToRolesAsync(AddRoleToUser model);
        Task<UserVm> GetById(string id);
        Task<bool> Delete(string id);
        Task<(List<UserVm> data, long totalCount)> Paging(PagingParamModel pagingParam);
        Task<IEnumerable<TreeItem<FunctionVm>>> GetMenuByUserPermission();
    }
}
