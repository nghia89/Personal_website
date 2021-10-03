using Hangfire;
using Hangfire.Mongo;
using Hangfire.Mongo.Migration.Strategies;
using Hangfire.Mongo.Migration.Strategies.Backup;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;
using WorkerService.HandleService;
using WorkerService.HandleService.Interfaces;

namespace WorkerService.Extentions
{
    public static class HandleFireService
    {
        public static IServiceCollection RegisterHandleFireService(this IServiceCollection services, HostBuilderContext context)
        {

            var conn = context.Configuration.GetSection("MongoDB").Value;
            // Add Hangfire services.

            var mongoUrlBuilder = new MongoUrlBuilder(conn);
            var mongoClient = new MongoClient(mongoUrlBuilder.ToMongoUrl());

            services.AddHangfire(configuration => configuration
                .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings()
                .UseMongoStorage(mongoClient, mongoUrlBuilder.DatabaseName, new MongoStorageOptions
                {
                    MigrationOptions = new MongoMigrationOptions
                    {
                        MigrationStrategy = new MigrateMongoMigrationStrategy(),
                        BackupStrategy = new CollectionMongoBackupStrategy()
                    },
                    Prefix = "hangfire.mongo",
                    CheckConnection = true
                })
                );

            // Add the processing server as IHostedService
            services.AddHangfireServer();
            services.AddTransient<ISomeHandleService, SomeHandleService>();

            return services;
        }
    }
}
