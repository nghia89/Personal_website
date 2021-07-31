using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Infrastructure;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IProductBusiness
    {
        Task<long> Add(ProductVM model);
        Task AddTest(ProductVM model);
        Task<ProductVM> Update(ProductVM product);
        Task<ProductVM> GetById(long id);
        Task<bool> Delete(long id);
        Task DeleteImg(long imgId);
        Task<List<ProductVM>> GetAll();
        Task<PagedResult<ProductVM>> Paging(PagingParamModel pagingParam);
        Task<List<ProductVM>> GetProductByCateId(long cateId);
        Task<string> GenarateCode(string code);
    }
}
