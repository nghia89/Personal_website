using System.Collections.Generic;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Common;
using WorkerService.Message;

namespace WebAppIdentityServer.Business.Interfaces.Mongo
{
    public interface IAnnouncementBusiness
    {
        public Task Add(AnnouncementMessage announcement);
        public Task<long>CountUnRead();
        public Task<(long total, List<AnnouncementVM> data)> Paging(PagingParamModel pagingParam);
    }
}
