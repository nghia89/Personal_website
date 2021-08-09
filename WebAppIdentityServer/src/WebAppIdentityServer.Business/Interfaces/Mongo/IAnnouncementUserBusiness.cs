using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WorkerService.Message;

namespace WebAppIdentityServer.Business.Interfaces.Mongo
{
    public interface IAnnouncementUserBusiness
    {
        public Task Add(AnnouncementUser announcement);
    }
}
