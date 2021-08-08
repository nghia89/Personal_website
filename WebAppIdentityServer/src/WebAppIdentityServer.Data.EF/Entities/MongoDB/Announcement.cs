
using MongoDB.Bson;
using System;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Data.EF.Interfaces.MongoDB;
using WebAppIdentityServer.Data.EF.MongoRepository;
using WebAppIdentityServer.ViewModel.Enum;

namespace WebAppIdentityServer.Data.EF.Entities.MongoDB
{
    [BsonCollection("Announcement")]
    public class Announcement : IDocument, IDateTracking, IEntityTracking
    {
        public ObjectId Id { get; set; }
        public string Title { set; get; }
        public string Content { set; get; }
        public string Link { set; get; }
        public string UserId { set; get; }
        public Status Status { set; get; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

    }
}
