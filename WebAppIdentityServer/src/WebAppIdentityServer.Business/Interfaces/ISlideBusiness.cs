using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface ISlideBusiness
    {
        Task<Slide> Add(SlideShowVM model);
        Task<Slide> Update(SlideShowVM model);
        Task<bool> Delete(long id);
        Task<List<SlideShowVM>> GetAll();
        Task<SlideShowVM> GetById(long id);

    }
}
