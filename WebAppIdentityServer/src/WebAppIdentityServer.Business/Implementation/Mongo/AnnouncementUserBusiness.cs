using MongoDB.Bson;
using System;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;
using WebAppIdentityServer.ViewModel.Enum;
using WorkerService.Message;

namespace WebAppIdentityServer.Business.Implementation.Mongo
{
    public class AnnouncementUserBusiness : IAnnouncementUserBusiness
    {
        private readonly IMongoRepository<AnnouncementUser> _mongoRepository;
        public AnnouncementUserBusiness(IMongoRepository<AnnouncementUser> mongoRepository)
        {
            _mongoRepository = mongoRepository;
        }
        public async Task Add(AnnouncementUser announcement)
        {
            await _mongoRepository.AddOneAsync(new AnnouncementUser()
            {
                AnnouncementId = announcement.AnnouncementId,
                HasRead = false,
                UserId = announcement.UserId
            });
        }
    }
}
