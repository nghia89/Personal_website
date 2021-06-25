using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IProductImageBusiness
    {
        Task Add(ProductImageVM model);
        Task Add(List<ProductImageVM> model, long productId);
        Task Delete(long id);
        Task Update(ProductImageVM model);
        Task ProductImageReorder(long productId, List<long> imgIds);
        Task<ProductImageVM> GetById(long id);
        Task<List<ProductImageVM>> GetByProductId(long productId);
    }
}
