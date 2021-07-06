using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WebAppIdentityServer.Data.EF.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<long> CountAsync(Expression<Func<T, bool>> predicate);
        Task RemoveAsync(T entity);
        Task RemoveMultipleAsync(List<T> entities);
        void Dispose();
        Task<ICollection<T>> FindAllAsync();
        Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, object>>[] includeProperties, Expression<Func<T, T>> projection = null);
        Task<T> FindFirstAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, object>>[] includeProperties, Expression<Func<T, T>> projection = null);
        Task<ICollection<T>> GetAllAsync(Expression<Func<T, object>>[] includeProperties, Expression<Func<T, T>> projection = null);
        Task<T> GetByAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, object>>[] includeProperties, Expression<Func<T, T>> projection = null);
        Task<T> GetByIdAsync(object key);
        Task<(List<T> entities, long totalCount)> Paging(string query, int? page, int? pageSize, Expression<Func<T, object>>[] queryFields, Func<IQueryable<T>, IQueryable<T>> custom = null, Expression<Func<T, T>> projection = null);
        Task<List<T>> PagingNotCount(string query, int? page, int? pageSize, Expression<Func<T, object>>[] queryFields, Func<IQueryable<T>, IQueryable<T>> custom = null, Expression<Func<T, T>> projection = null);
        Task<long> SaveAsync();
        void Add(T t);
        Task AddAsync(T t);
        Task Update(T t, object key);
        Task<T> UpdateAsync(T t, object key);
        IQueryable<T> ContextQuery();
        IQueryable<T> QueryString(string query, params Expression<Func<T, object>>[] properties);
    }
}
