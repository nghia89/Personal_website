using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Business.Interfaces
{
    public interface IFeedbackBusiness
    {
        Task Add(FeedbackVM feedbackVm);

        Task Delete(int id);

        Task<(List<FeedbackVM> data, long totalCount)> GetAllPaging(string keyword, int page, int pageSize);

        Task<FeedbackVM> GetById(int id);

    }
}
