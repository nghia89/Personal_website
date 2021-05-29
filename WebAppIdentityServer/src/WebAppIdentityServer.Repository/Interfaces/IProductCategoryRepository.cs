using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Repository.Interfaces
{
    public interface IProductCategoryRepository : IRepository<ProductCategory>
    {
        Task<IEnumerable<ProductCategory>> getCateByIds(List<long> ids);
    }
}
