using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkerService.Repositoty.Implementation;
using WorkerService.Repositoty.Interfaces;

namespace WorkerService.Extentions
{
    public static class RegisterRepositoryService
    {
        public static IServiceCollection RegisterRepositoryServices(this IServiceCollection services)
        {
            services.AddTransient<IProductWorkerRepository, ProductWorkerRepository>();
            services.AddTransient<IActivitylogWorkerRepositoty, ActivitylogWorkerRepositoty>();

            return services;
        }
    }

}
