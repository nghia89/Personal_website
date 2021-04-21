using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IFunctionBusiness
    {
        Task<FunctionVm> Add(FunctionVm model);
        Task<FunctionVm> Update(FunctionVm product);
        Task<FunctionVm> GetById(long id);
        Task<bool> Delete(long id);
        Task<List<FunctionVm>> GetAll();
        Task<List<FunctionVm>> GetFuncChild();
        Task<(List<FunctionVm> data, long totalCount)> Paging(PagingParamModel pagingParam);
    }
}
