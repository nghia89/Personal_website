

using MongoDB.Bson;
using System;
using WebAppIdentityServer.Data.EF.Interfaces.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;

namespace WebAppIdentityServer.Data.EF.Entities.MongoDB
{
    [BsonCollection("AnnouncementUser")]
    public class AnnouncementUser : IDocument
    {
        public ObjectId AnnouncementId { get; set; }
        public string UserId { set; get; }
        public bool? HasRead { get; set; }
        public ObjectId Id { get; set; }
        public DateTime DateCreated { get; set; }
    }

}
