using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface ICatalogOtherBusiness
    {
        Task<CatalogOtherVM> Add(CatalogOtherVM model);
        Task<CatalogOtherVM> Update(CatalogOtherVM product);
        Task<CatalogOtherVM> GetById(int id);
        Task<bool> Delete(int id);
        Task<List<CatalogOtherVM>> GetAll();
    }
}
