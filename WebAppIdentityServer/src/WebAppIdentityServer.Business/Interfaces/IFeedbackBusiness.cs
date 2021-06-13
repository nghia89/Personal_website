using System.Threading.Tasks;
using WebAppIdentityServer.Utilities;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IFeedbackBusiness
    {
        Task Add(FeedbackVM feedbackVm);

        Task Delete(int id);

        Task<PagedResult<FeedbackVM>> GetAllPaging(string keyword, int page, int pageSize);

        Task<FeedbackVM> GetById(int id);

    }
}
