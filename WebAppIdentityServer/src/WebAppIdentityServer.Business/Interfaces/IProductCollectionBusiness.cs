using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Infrastructure;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IProductCollectionBusiness
    {
        Task<ProductCollectionVM> Add(ProductCollectionVM model);

        Task Update(ProductCollectionVM model);

        Task Delete(long id);

        Task<List<ProductCollectionVM>> GetAll();

        Task<ProductCollectionVM> GetById(long id);

        Task<PagedResult<ProductCollectionVM>> Paging(PagingParamModel pagingParam);
    }
}
