using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Repository.Implementation;
using WebAppIdentityServer.Repository.Interfaces;

namespace WorkerService.Extentions
{
    public static class RegisterRepositoryService
    {
        public static IServiceCollection RegisterRepositoryServices(this IServiceCollection services)
        {
            services.AddTransient<IProductWorkerRepository, ProductWorkerRepository>();

            return services;
        }
    }

}
