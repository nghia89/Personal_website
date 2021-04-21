using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IProductBusiness
    {
        Task<ProductVM> Add(ProductVM model);
        Task<ProductVM> Update(ProductVM product);
        Task<ProductVM> GetById(long id);
        Task<bool> Delete(long id);
        Task<List<ProductVM>> GetAll();
        Task<(List<ProductVM> data, long totalCount)> Paging(PagingParamModel pagingParam);
        Task<List<ProductVM>> GetProductByCateId(long cateId);
    }
}
