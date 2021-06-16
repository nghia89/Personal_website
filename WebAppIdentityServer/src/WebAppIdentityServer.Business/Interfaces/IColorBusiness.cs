using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IColorBusiness
    {
        Task Add(ColorVM model);
        Task Update(ColorVM model);
        Task<ColorVM> GetById(int id);
        Task<List<ColorVM>> GetAll();

    }
}
