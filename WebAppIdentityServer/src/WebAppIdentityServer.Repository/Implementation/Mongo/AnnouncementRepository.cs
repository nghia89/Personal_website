using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;
using WebAppIdentityServer.Repository.Interfaces.Mongo;
using WebAppIdentityServer.ViewModel.Common;

namespace WebAppIdentityServer.Repository.Implementation.Mongo
{
    public class AnnouncementRepository : MongoRepository<Announcement>, IAnnouncementRepository
    {
        private readonly IMongoDbSettings _settings;
        public AnnouncementRepository(IMongoDbSettings settings) :base(settings)
        {
            _settings = settings;
        }
    }
}
