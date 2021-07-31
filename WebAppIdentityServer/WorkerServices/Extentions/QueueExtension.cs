using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Utilities;
using WorkerService.Consumers;

namespace WorkerService.Extentions
{
    public static class QueueExtension
    {
        public static IServiceCollection RegisterQueueServices(this IServiceCollection services, HostBuilderContext context)
        {
            var queueSettings = new QueueSettings();
            context.Configuration.GetSection("QueueSettings").Bind(queueSettings);

            services.AddMassTransit(c =>
            {
                c.AddConsumer<ProductConsumer>();
            });

            services.AddSingleton(provider => Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                var host = cfg.Host(queueSettings.HostName, queueSettings.VirtualHost, h => {
                    h.Username(queueSettings.UserName);
                    h.Password(queueSettings.Password);
                });
                cfg.SetLoggerFactory(provider.GetService<ILoggerFactory>());

            }));

            return services;
        }
    }

}
