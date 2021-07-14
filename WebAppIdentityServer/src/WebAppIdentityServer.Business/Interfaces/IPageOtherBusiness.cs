using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Infrastructure;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IPageOtherBusiness
    {
        Task<PageOtherVM> Add(PageOtherVM model);
        Task<PageOtherVM> Update(PageOtherVM product);
        Task<PageOtherVM> GetById(int id);
        Task<bool> Delete(int id);
        Task<List<PageOtherVM>> GetAll();
        Task<PagedResult<PageOtherVM>> Paging(PagingParamModel pagingParam);
    }
}
