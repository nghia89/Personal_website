using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;

namespace WebAppIdentityServer.Repository.Interfaces.Mongo
{
    public interface IAnnouncementRepository : IMongoRepository<Announcement>
    {
    }
}
