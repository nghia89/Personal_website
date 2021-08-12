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
using WorkerService.Message;

namespace WebAppIdentityServer.Business.Implementation.Mongo
{
    public class AnnouncementUserBusiness : BaseBusiness, IAnnouncementUserBusiness
    {
        private readonly IMongoRepository<AnnouncementUser> _mongoRepository;
        public AnnouncementUserBusiness(IMongoRepository<AnnouncementUser> mongoRepository, IUserResolverService userResolver) : base(userResolver)
        {
            _mongoRepository = mongoRepository;
        }
        public async Task Add(AnnouncementUser announcement)
        {
            await _mongoRepository.AddOneAsync(new AnnouncementUser()
            {
                AnnouncementId = announcement.AnnouncementId,
                HasRead = true,
                UserId = announcement.UserId,
                DateCreated = announcement.DateCreated
            });
        }



        public async Task<(long total, List<AnnouncementUser> data)> GetAnnounByUser(PagingParamModel pagingParam)
        {
            var (total, data) = await _mongoRepository.AggregateByPage(pagingParam.page, pagingParam.pageSize,
                                                                        Builders<AnnouncementUser>.Filter.Where(c => c.UserId == this.UserId && c.DateCreated <= DateTime.UtcNow),
                                                                        Builders<AnnouncementUser>.Sort.Descending(s=>s.DateCreated));
            return (total, data.ToList());
        }

        public async Task<long> CountUnRead()
        {
            var total = await _mongoRepository.Count(Builders<AnnouncementUser>.Filter.Where(x => x.UserId == this.UserId && x.HasRead == true));
            return (total);
        }
    }
}
