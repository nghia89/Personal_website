using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF
{

    public class EFRepository<T> : BaseRepository, IRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        public EFRepository(ApplicationDbContext context, IHttpContextAccessor accessor):base(accessor)
        {
            this._context = context;
        }
        public void Add(T t)
        {
            _context.Set<T>().Add(t);
        }
        public async Task AddAsync(T t)
        {
            await _context.Set<T>().AddAsync(t);
        }

        public async Task<long> CountAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).CountAsync();
        }

        private bool disposed = false;
        protected void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public async Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, object>>[] includeProperties, Expression<Func<T, T>> projection = null)
        {
            IQueryable<T> items = _context.Set<T>();
            if (includeProperties != null)
            {
                foreach (Expression<Func<T, object>> includeProperty in includeProperties)
                {
                    items = items.Include(includeProperty);
                }
            }
            if (projection != null)
            {
                items = items.Select(projection);
            }
            return await items.AsNoTracking().Where(predicate).ToListAsync();
        }

        public async Task<T> FindFirstAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, object>>[] includeProperties, Expression<Func<T, T>> projection = null)
        {
            IQueryable<T> items = _context.Set<T>();
            if (includeProperties != null)
            {
                foreach (Expression<Func<T, object>> includeProperty in includeProperties)
                {
                    items = items.Include(includeProperty);
                }
            }
            if (projection != null)
            {
                items = items.Select(projection);
            }
            return await items.AsNoTracking().FirstOrDefaultAsync(predicate);
        }

        public async Task<ICollection<T>> GetAllAsync(Expression<Func<T, object>>[] includeProperties, Expression<Func<T, T>> projection = null)
        {
            IQueryable<T> items = _context.Set<T>().AsNoTracking();
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    items = items.Include(includeProperty);
                }
            }
            if (projection != null)
            {
                items = items.Select(projection);
            }
            return await items.ToListAsync();
        }

        public async Task<T> GetByAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, object>>[] includeProperties, Expression<Func<T, T>> projection = null)
        {
            IQueryable<T> items = _context.Set<T>();
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    items = items.Include(includeProperty);
                }
            }
            if (projection != null)
            {
                items = items.Select(projection);
            }
            return await items.Where(predicate).FirstOrDefaultAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<(List<T> entities, long totalCount)> Paging(string query, int? page, int? pageSize, Expression<Func<T, object>>[] queryFields, Func<IQueryable<T>, IQueryable<T>> custom = null, Expression<Func<T, T>> projection = null)
        {
            var defaultPageSize = 20;
            var defaultPage = 1;

            if (!pageSize.HasValue)
            {
                pageSize = defaultPageSize;
            }

            if (!page.HasValue)
            {
                page = defaultPage;
            }

            IQueryable<T> Query = _context.Set<T>();
            var items = !string.IsNullOrEmpty(query)
                ? QueryString(query, queryFields)
                : Query;

            if (custom != null)
            {
                items = custom(items);
            }

            if (projection != null)
            {
                items = items.Select(projection);
            }

            var skip = (page.Value - 1) * pageSize.Value;
            var take = pageSize.Value;

            var totalCount = await items.LongCountAsync();
            var list = await items.Skip(skip).Take(take).ToListAsync();

            return (list, totalCount);
        }


        public async Task<List<T>> PagingNotCount(string query, int? page, int? pageSize, Expression<Func<T, object>>[] queryFields, Func<IQueryable<T>, IQueryable<T>> custom = null, Expression<Func<T, T>> projection = null)
        {
            var defaultPageSize = 20;
            var defaultPage = 1;

            if (!pageSize.HasValue)
            {
                pageSize = defaultPageSize;
            }

            if (!page.HasValue || page.Value < 1)
            {
                page = defaultPage;
            }

            IQueryable<T> Query = _context.Set<T>();
            var items = !string.IsNullOrEmpty(query)
                ? QueryString(query, queryFields)
                : Query;

            if (custom != null)
            {
                items = custom(items);
            }

            if (projection != null)
            {
                items = items.Select(projection);
            }

            var skip = (page.Value - 1) * pageSize.Value;
            var take = pageSize.Value;

            var list = await items.Skip(skip).Take(take).ToListAsync();

            return list;
        }

        public IQueryable<T> QueryString(string query, params Expression<Func<T, object>>[] properties)
        {
            if (string.IsNullOrEmpty(query) || properties == null || !properties.Any())
            {
                return _context.Set<T>().AsQueryable();
            };

            var tableName = GetTableName<T>();

            var listFields = properties.Select(m => $"{GetNameField(m)} like concat('%',@p0,'%')").ToList();

            var sqlQuery = $"Select * From {tableName} WHERE {string.Join(" OR ", listFields)}";
            return _context.Set<T>().FromSqlRaw<T>(sqlQuery, query.Trim()).AsQueryable();
        }

        public string GetTableName<TEntity>()
        {
            var entityTypes = _context.Model.GetEntityTypes();
            var entityTypeOfFooBar = entityTypes.First(t => t.ClrType == typeof(TEntity));
            var tableNameAnnotation = entityTypeOfFooBar.GetAnnotation("Relational:TableName");
            var tableNameOfFooBarSet = tableNameAnnotation.Value.ToString();
            return tableNameOfFooBarSet;
        }

        public static string GetNameField(Expression<Func<T, object>> exp)
        {
            if (!(exp.Body is MemberExpression body))
            {
                UnaryExpression ubody = (UnaryExpression)exp.Body;
                body = ubody.Operand as MemberExpression;
            }

            return body.Member.Name;
        }


        public async Task RemoveMultipleAsync(List<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
            await _context.SaveChangesAsync();
        }

        public async Task<long> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task Update(T t, object key)
        {
            if (t == null)
            {
                return;
            }

            T exist = await _context.Set<T>().FindAsync(key);
            if (exist != null)
            {
                _context.Entry(exist).CurrentValues.SetValues(t);
            }
        }
        public async Task<T> UpdateAsync(T t, object key)
        {
            if (t == null)
            {
                return null;
            }

            T exist = await _context.Set<T>().FindAsync(key);
            if (exist != null)
            {
                _context.Entry(exist).CurrentValues.SetValues(t);
            }
            return exist;
        }

        public async Task<T> GetByIdAsync(object key)
        {
            return await _context.Set<T>().FindAsync(key);
        }

        public IQueryable<T> ContextQuery()
        {
            return _context.Set<T>();
        }
    }
}
