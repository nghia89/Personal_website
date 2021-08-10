using MassTransit;
using MassTransit.Initializers;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Enum;
using WebAppIdentityServer.ViewModel.Models.Common;
using WorkerService.Message;

namespace WebAppIdentityServer.Business.Implementation.Mongo
{
    public class AnnouncementBusiness : BaseBusiness, IAnnouncementBusiness
    {
        private readonly IMongoRepository<Announcement> _mongoRepository;
        private readonly IAnnouncementUserBusiness _announcementUserBus;
        private readonly IBusControl _bus;
        public AnnouncementBusiness(IMongoRepository<Announcement> mongoRepository, IAnnouncementUserBusiness announcementUserBus,
                                    IBusControl bus, IUserResolverService userResolver) : base(userResolver)
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
                        DateCreated = DateTime.UtcNow,
                    });
                }
            }
        }

        public async Task<long> CountUnRead()
        {
            return await _announcementUserBus.CountUnRead();
        }

        public async Task<(long total, List<AnnouncementVM> data)> Paging(PagingParamModel pagingParam)
        {
            var (total, announcementUsers) = await _announcementUserBus.GetAnnounByUser(pagingParam);
            var listAnnouncementId = announcementUsers.Select(x => x.AnnouncementId).ToList();

            var data = await _mongoRepository.FindByIdsAsync(listAnnouncementId);

            return (total, data.Select(x => new AnnouncementVM()
            {
                Content = x.Content,
                DateCreated = x.DateCreated,
                Id = x.Id.ToString(),
                Link = x.Link,
                Status = x.Status,
                Title = x.Title,
                Type = x.Type,
                UserId = x.UserId
            }).ToList());
        }
    }
}
