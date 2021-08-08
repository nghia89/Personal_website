using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;

namespace WebAppIdentityServer.Repository.Interfaces.Mongo
{
    public interface IAnnouncementRepository : IMongoRepository<Announcement>
    {
    }
}
