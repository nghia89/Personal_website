using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IProductQuantityBusiness
    {
        Task Add(ProductQuantityVM model);
        Task Delete(long id);
        Task Update(ProductQuantityVM model);
        Task<ProductQuantityVM> GetById(long id);
        Task<List<ProductQuantityVM>> GetByProductId(long productId);
    }
}
