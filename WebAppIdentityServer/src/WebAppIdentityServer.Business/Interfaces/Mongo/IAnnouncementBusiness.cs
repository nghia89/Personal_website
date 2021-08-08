using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Entities.MongoDB;

namespace WebAppIdentityServer.Business.Interfaces.Mongo
{
    public interface IAnnouncementBusiness
    {
        public Task Add(Announcement announcement);
    }
}
