using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface ISystemConfigBusiness
    {
        Task Add(SystemConfigVM model);
        Task Update(SystemConfigVM model);
        Task<SystemConfigVM> GetById(long id);
        Task<SystemConfigVM> GetByFirstSystem();

    }
}
