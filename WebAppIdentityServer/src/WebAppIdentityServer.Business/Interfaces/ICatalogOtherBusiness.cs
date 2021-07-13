using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Infrastructure;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface ICatalogOtherBusiness
    {
        Task<CatalogOtherVM> Add(CatalogOtherVM model);
        Task<CatalogOtherVM> Update(CatalogOtherVM product);
        Task<CatalogOtherVM> GetById(long id);
        Task<bool> Delete(long id);
        Task<List<CatalogOtherVM>> GetAll();
    }
}
