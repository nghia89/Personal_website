using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Interfaces.MongoDB;

namespace WebAppIdentityServer.Data.EF.MongoRepository
{
    public interface IMongoRepository<TDocument> where TDocument : IDocument
    {
        IQueryable<TDocument> AsQueryable();
        Task<TDocument> FindByIdAsync(string id);
        Task AddOneAsync(TDocument document);
        Task AddManyAsync(ICollection<TDocument> documents);
        Task DeleteOneAsync(Expression<Func<TDocument, bool>> filterExpression);
        Task DeleteByIdAsync(string id);
        Task DeleteManyAsync(Expression<Func<TDocument, bool>> filterExpression);
    }
}
