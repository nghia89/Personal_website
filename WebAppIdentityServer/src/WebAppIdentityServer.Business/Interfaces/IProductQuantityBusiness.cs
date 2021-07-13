using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IProductQuantityBusiness
    {
        Task<long> Add(ProductQuantityVM model);
        Task Delete(long id);
        Task Update(ProductQuantityVM model);
        Task Update(List<ProductQuantityVM> model);
        Task<ProductQuantityVM> GetById(long id);
        Task<List<ProductQuantityVM>> GetByProductId(long productId);
    }
}
