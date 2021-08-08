using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebAppIdentityServer.Data.EF.Interfaces.MongoDB
{
    public interface IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        ObjectId Id { get; set; }
    }
}
