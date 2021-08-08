using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Interfaces.MongoDB;
using WebAppIdentityServer.ViewModel.Common;

namespace WebAppIdentityServer.Data.EF.MongoRepository
{
    public class MongoRepository<TDocument> : IMongoRepository<TDocument>
     where TDocument : IDocument
    {
        private readonly IMongoCollection<TDocument> _collection;

        public MongoRepository(IMongoDbSettings settings)
        {
            var database = new MongoClient(settings.ConnectionString).GetDatabase(settings.DatabaseName);
            _collection = database.GetCollection<TDocument>(GetCollectionName(typeof(TDocument)));
        }

        private protected string GetCollectionName(Type documentType)
        {
            return ((BsonCollectionAttribute)documentType.GetCustomAttributes(
                    typeof(BsonCollectionAttribute),
                    true)
                .FirstOrDefault())?.CollectionName;
        }

        public virtual IQueryable<TDocument> AsQueryable()
        {
            return _collection.AsQueryable();
        }

        public virtual IEnumerable<TDocument> FilterBy(
            Expression<Func<TDocument, bool>> filterExpression)
        {
            return _collection.Find(filterExpression).ToEnumerable();
        }

        public virtual IEnumerable<TProjected> FilterBy<TProjected>(
            Expression<Func<TDocument, bool>> filterExpression,
            Expression<Func<TDocument, TProjected>> projectionExpression)
        {
            return _collection.Find(filterExpression).Project(projectionExpression).ToEnumerable();
        }

        public virtual Task<TDocument> FindOneAsync(Expression<Func<TDocument, bool>> filterExpression)
        {
            return Task.Run(() => _collection.Find(filterExpression).FirstOrDefaultAsync());
        }

        public virtual Task<TDocument> FindByIdAsync(string id)
        {
            return Task.Run(() =>
            {
                var objectId = new ObjectId(id);
                var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, objectId);
                return _collection.Find(filter).SingleOrDefaultAsync();
            });
        }

        public virtual Task AddOneAsync(TDocument document)
        {
            return Task.Run(() => _collection.InsertOneAsync(document));
        }

        public virtual async Task AddManyAsync(ICollection<TDocument> documents)
        {
            await _collection.InsertManyAsync(documents);
        }


        public void DeleteOne(Expression<Func<TDocument, bool>> filterExpression)
        {
            _collection.FindOneAndDelete(filterExpression);
        }

        public Task DeleteOneAsync(Expression<Func<TDocument, bool>> filterExpression)
        {
            return Task.Run(() => _collection.FindOneAndDeleteAsync(filterExpression));
        }

        public Task DeleteByIdAsync(string id)
        {
            return Task.Run(() =>
            {
                var objectId = new ObjectId(id);
                var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, objectId);
                _collection.FindOneAndDeleteAsync(filter);
            });
        }

        public Task DeleteManyAsync(Expression<Func<TDocument, bool>> filterExpression)
        {
            return Task.Run(() => _collection.DeleteManyAsync(filterExpression));
        }

    }
}
