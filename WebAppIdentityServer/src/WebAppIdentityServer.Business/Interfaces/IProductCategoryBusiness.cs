using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IProductCategoryBusiness
    {
        Task<ProductCategoryVM> Add(ProductCategoryVM productCategoryVm);

        Task Update(ProductCategoryVM productCategoryVm);

        Task Delete(long id);

        Task<List<ProductCategoryVM>> GetAll(string keyword);

        Task<List<ProductCategoryVM>> GetAllByParentId(long parentId);

        Task<ProductCategoryVM> GetById(long id);
    }
}
