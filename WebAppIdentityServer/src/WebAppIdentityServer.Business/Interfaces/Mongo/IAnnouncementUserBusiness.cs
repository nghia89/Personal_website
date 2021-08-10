using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.ViewModel.Common;
using WorkerService.Message;

namespace WebAppIdentityServer.Business.Interfaces.Mongo
{
    public interface IAnnouncementUserBusiness
    {
        public Task Add(AnnouncementUser announcement);
        public Task<(long total, List<AnnouncementUser> data)> GetAnnounByUser(PagingParamModel pagingParam);
        Task<long> CountUnRead();
    }
}
