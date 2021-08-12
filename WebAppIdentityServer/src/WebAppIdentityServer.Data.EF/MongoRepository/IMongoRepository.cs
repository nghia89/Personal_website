using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Interfaces.MongoDB;

namespace WebAppIdentityServer.Data.EF.MongoRepository
{
    public interface IMongoRepository<TDocument> where TDocument : IDocument
    {
        IQueryable<TDocument> AsQueryable();
        Task<TDocument> FindByIdAsync(string id);
        Task<IEnumerable<TDocument>> FindByIdsAsync(List<string> ids);
        Task<IEnumerable<TDocument>> FindByIdsAsync(List<ObjectId> ids);
        Task AddOneAsync(TDocument document);
        Task<IAsyncCursor<TDocument>> FilterBy(
            Expression<Func<TDocument, bool>> filterExpression);
        Task<IEnumerable<TDocument>> Filter(FilterDefinition<TDocument> filterDefinition);
        Task AddManyAsync(ICollection<TDocument> documents);
        Task DeleteOneAsync(Expression<Func<TDocument, bool>> filterExpression);
        Task DeleteByIdAsync(string id);
        Task DeleteManyAsync(Expression<Func<TDocument, bool>> filterExpression);
        Task<(long count, IReadOnlyList<TDocument> data)> AggregateByPage(int? page, int? pageSize, FilterDefinition<TDocument> filterDefinition = null);
        Task<(long count, IReadOnlyList<TDocument> data)> AggregateByPage(int? page, int? pageSize, FilterDefinition<TDocument> filterDefinition, SortDefinition<TDocument> sortDefinition);
        Task<long> Count(FilterDefinition<TDocument> filterDefinition);
    }
}
