using GreenPipes;
using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Hubs;
using WebAppIdentityServer.Api.Hubs.Bus;
using WebAppIdentityServer.ViewModel.Common;
using static WebAppIdentityServer.Api.Hubs.NotifyHub;

namespace WebAppIdentityServer.Api.Extensions
{
    public static class SignalrService
    {
        public static void AddSignalrService(this IServiceCollection services, IConfiguration Configuration)
        {
            var queueSettings = new QueueSettings();
           Configuration.GetSection("QueueSettings").Bind(queueSettings);

            services.AddMassTransit(c =>
            {
                c.AddConsumer<NotifyConsumer>();
            });

            services.AddSingleton(provider => Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                var host = cfg.Host(queueSettings.HostName, queueSettings.VirtualHost, h => {
                    h.Username(queueSettings.UserName);
                    h.Password(queueSettings.Password);
                });

            }));
            services.AddHostedService<BusHostService>();
            services.AddSignalR();
            services.AddSingleton<IUserIdProvider, UserProvider>();
        }

        public static void AddSignalrConfigure(this IApplicationBuilder app)
        {
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotifyHub>("/hubs");
            });
        }
    }
}
