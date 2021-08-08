using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;
using WebAppIdentityServer.Utilities;

namespace WebAppIdentityServer.Api.Extensions
{
    public static class QueueExtension
    {
        public static IServiceCollection RegisterQueueServices(this IServiceCollection services, IConfiguration section)
        {
            var appSettingsSection = section.GetSection("QueueSettings");
            var queueSettings = appSettingsSection.Get<QueueSettings>();

            services.AddSingleton(provider => Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                var host = cfg.Host(queueSettings.HostName, queueSettings.VirtualHost,
                    h =>
                    {
                        h.Username(queueSettings.UserName);
                        h.Password(queueSettings.Password);
                    });

                cfg.ExchangeType = ExchangeType.Direct;
            }));

            services.AddSingleton<IPublishEndpoint>(provider => provider.GetRequiredService<IBusControl>());
            services.AddSingleton<ISendEndpointProvider>(provider => provider.GetRequiredService<IBusControl>());
            services.AddSingleton<IBus>(provider => provider.GetRequiredService<IBusControl>());

            return services;
        }
    }
}
