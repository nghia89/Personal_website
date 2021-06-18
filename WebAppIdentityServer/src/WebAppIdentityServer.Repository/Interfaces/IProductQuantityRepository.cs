using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Repository.Interfaces
{
    public interface IProductQuantityRepository : IRepository<ProductQuantity>
    {

        Task<IEnumerable<ProductQuantity>> getByProductIds(long productId);
    }
}
