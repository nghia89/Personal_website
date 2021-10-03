using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using WebAppIdentityServer.Utilities;
using WebAppIdentityServer.ViewModel.Common;

namespace WorkerService.Extentions
{
    public static class ConfigurationServiceExtension
    {
        public static IServiceCollection RegisterConfigurationServices(this IServiceCollection service, HostBuilderContext context)
        {
            var connectionStrings = new ConnectionStrings();
            var queueSettings = new QueueSettings();
            var mongoDbSettings = new MongoDbSettings();

            context.Configuration.GetSection("ConnectionStrings").Bind(connectionStrings);
            context.Configuration.GetSection("QueueSettings").Bind(queueSettings);
            context.Configuration.GetSection("MongoDbSettings").Bind(mongoDbSettings);

            service.AddSingleton<IMongoDbSettings>(mongoDbSettings);
            service.AddSingleton(connectionStrings);
            service.AddSingleton(queueSettings);

            return service;
        }
    }

}
