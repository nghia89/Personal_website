using Microsoft.Extensions.DependencyInjection;
using WebAppIdentityServer.Repository.Implementation.Mongo;
using WebAppIdentityServer.Repository.Interfaces.Mongo;
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
            services.AddTransient<IAnnouncementRepository, AnnouncementRepository>();

            return services;
        }
    }

}
