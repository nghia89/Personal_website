using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public async virtual Task<IAsyncCursor<TDocument>> FilterBy(
            Expression<Func<TDocument, bool>> filterExpression)
        {
            return await _collection.FindAsync(filterExpression);
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
            if (document.Id == ObjectId.Empty)
                document.Id = ObjectId.GenerateNewId();
            return Task.Run(() => _collection.InsertOneAsync(document));
        }

        public virtual async Task AddManyAsync(ICollection<TDocument> documents)
        {
            await _collection.InsertManyAsync(documents);
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

        public async Task<(long totalPages, IReadOnlyList<TDocument> data)> AggregateByPage(int? page, int? pageSize,
                                                                                            FilterDefinition<TDocument> filterDefinition = null)
        {
            int pageNew = (page.HasValue == false || page == 0) ? 1 : page.Value;
            int pageSizeNew = (pageSize.HasValue == false || pageSize == 0) ? 20 : pageSize.Value;

            var countFacet = AggregateFacet.Create("count",
                PipelineDefinition<TDocument, AggregateCountResult>.Create(new[]
                {
                PipelineStageDefinitionBuilder.Count<TDocument>()
                }));

            var dataFacet = AggregateFacet.Create("data",
                PipelineDefinition<TDocument, TDocument>.Create(new[]
                {
                PipelineStageDefinitionBuilder.Skip<TDocument>((pageNew - 1) * pageSizeNew),
                PipelineStageDefinitionBuilder.Limit<TDocument>(pageSizeNew),
                }));

            var filter = filterDefinition == null ? Builders<TDocument>.Filter.Empty : filterDefinition;
            var aggregation = await _collection.Aggregate()
                .Match(filter)
                .Facet(countFacet, dataFacet)
                .ToListAsync();

            var count = aggregation.First()
                .Facets.First(x => x.Name == "count")
                .Output<AggregateCountResult>()
                ?.FirstOrDefault()
                ?.Count;
            count = count == null ? 0 : count;
            var totalPages = (int)Math.Ceiling((double)count / pageSizeNew);

            var data = aggregation.First()
                .Facets.First(x => x.Name == "data")
                .Output<TDocument>();

            return (totalPages, data);
        }

        public async Task<(long totalPages, IReadOnlyList<TDocument> data)> AggregateByPage(int? page, int? pageSize,
                                                                                            FilterDefinition<TDocument> filterDefinition,
                                                                                            SortDefinition<TDocument> sortDefinition
                                                                                            )
        {
            int pageNew = (page.HasValue == false || page == 0) ? 1 : page.Value;
            int pageSizeNew = (pageSize.HasValue == false || pageSize == 0) ? 20 : pageSize.Value;

            var countFacet = AggregateFacet.Create("count",
                PipelineDefinition<TDocument, AggregateCountResult>.Create(new[]
                {
                PipelineStageDefinitionBuilder.Count<TDocument>()
                }));

            var dataFacet = AggregateFacet.Create("data",
                PipelineDefinition<TDocument, TDocument>.Create(new[]
                {
                PipelineStageDefinitionBuilder.Sort(sortDefinition),
                PipelineStageDefinitionBuilder.Skip<TDocument>((pageNew - 1) * pageSizeNew),
                PipelineStageDefinitionBuilder.Limit<TDocument>(pageSizeNew),
                }));

            var filter = filterDefinition == null ? Builders<TDocument>.Filter.Empty : filterDefinition;
            var aggregation = await _collection.Aggregate()
                .Match(filter)
                .Facet(countFacet, dataFacet)
                .ToListAsync();

            var count = aggregation.First()
                .Facets.First(x => x.Name == "count")
                .Output<AggregateCountResult>()
                ?.FirstOrDefault()
                ?.Count;
            count = count == null ? 0 : count;
            var totalPages = (int)Math.Ceiling((double)count / pageSizeNew);

            var data = aggregation.First()
                .Facets.First(x => x.Name == "data")
                .Output<TDocument>();

            return (totalPages, data);
        }

        public async Task<IEnumerable<TDocument>> FindByIdsAsync(List<string> ids)
        {
            return await Task.Run(async () =>
            {
                var objectIds = ids.Select(x => new ObjectId(x));
                var filter = Builders<TDocument>.Filter.In(x => x.Id, objectIds);
                return await _collection.Find(filter).ToListAsync();
            });
        }

        public async Task<IEnumerable<TDocument>> FindByIdsAsync(List<ObjectId> ids)
        {
            return await Task.Run(async () =>
            {
                var filter = Builders<TDocument>.Filter.In(x => x.Id, ids);
                return await _collection.Find(filter).ToListAsync();
            });
        }

        public async Task<IEnumerable<TDocument>> Filter(FilterDefinition<TDocument> filterDefinition)
        {
            return await Task.Run(async () =>
            {
                return await _collection.Find(filterDefinition).ToListAsync();
            });
        }

        public async Task<long> Count(FilterDefinition<TDocument> filterDefinition)
        {
            return await _collection.CountDocumentsAsync(filterDefinition);
        }
    }
}
