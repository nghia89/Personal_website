using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface ISizeBusiness
    {
        Task Add(SizeVM model);
        Task Update(SizeVM model);
        Task<SizeVM> GetById(int id);
        Task<List<SizeVM>> GetAll();

    }
}
