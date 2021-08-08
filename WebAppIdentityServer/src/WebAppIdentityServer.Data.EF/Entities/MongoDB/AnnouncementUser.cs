

using MongoDB.Bson;
using System;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Data.EF.Interfaces.MongoDB;

namespace WebAppIdentityServer.Data.EF.Entities.MongoDB
{
    public class AnnouncementUser : IDocument
    {
        public long AnnouncementId { get; set; }
        public string UserId { set; get; }
        public bool? HasRead { get; set; }
        public ObjectId Id { get; set; }
    }

}
