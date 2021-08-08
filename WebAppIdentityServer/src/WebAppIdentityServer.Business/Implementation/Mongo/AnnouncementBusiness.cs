using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;

namespace WebAppIdentityServer.Business.Implementation.Mongo
{
    public class AnnouncementBusiness : IAnnouncementBusiness
    {
        private readonly IMongoRepository<Announcement> _mongoRepository;
        public AnnouncementBusiness(IMongoRepository<Announcement> mongoRepository)
        {
            _mongoRepository = mongoRepository;
        }
        public async Task Add(Announcement announcement)
        {
            await _mongoRepository.AddOneAsync(announcement);
        }
    }
}
