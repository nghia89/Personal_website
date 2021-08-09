using MassTransit;
using MongoDB.Bson;
using System;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;
using WebAppIdentityServer.ViewModel.Enum;
using WorkerService.Message;

namespace WebAppIdentityServer.Business.Implementation.Mongo
{
    public class AnnouncementBusiness : IAnnouncementBusiness
    {
        private readonly IMongoRepository<Announcement> _mongoRepository;
        private readonly IAnnouncementUserBusiness _announcementUserBus;
        private readonly IBusControl _bus;
        public AnnouncementBusiness(IMongoRepository<Announcement> mongoRepository, IAnnouncementUserBusiness announcementUserBus,
                                    IBusControl bus)
        {
            _mongoRepository = mongoRepository;
            _announcementUserBus = announcementUserBus;
            _bus = bus;
        }
        public async Task Add(AnnouncementMessage announcement)
        {
            if (announcement.ToUserIds?.Any() == false)
                return;
            var entity = new Announcement()
            {
                Content = announcement.Content,
                Link = announcement.Link,
                Status = Status.Active,
                Title = announcement.Title,
                UserId = announcement.UserId,
                Type = announcement.Type,
                DateCreated = DateTime.UtcNow
            };
            await _mongoRepository.AddOneAsync(entity);
            if (entity.Id != ObjectId.Empty)
            {
                foreach (var userId in announcement.ToUserIds)
                {
                    await _announcementUserBus.Add(new AnnouncementUser()
                    {
                        AnnouncementId = entity.Id,
                        UserId = userId
                    });
                    await _bus.Publish(new NotifyMessage()
                    {
                        Content = announcement.Content,
                        Link = announcement.Link,
                        Title = announcement.Title,
                        UserId = announcement.UserId,
                        Type = announcement.Type,
                        ToUserId = userId,
                        DateCreated = DateTime.UtcNow
                    });
                }
            }
        }
    }
}
