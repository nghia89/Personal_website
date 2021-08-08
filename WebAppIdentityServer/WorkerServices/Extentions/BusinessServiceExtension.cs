using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using WebAppIdentityServer.Business.Implementation.Mongo;
using WebAppIdentityServer.Business.Interfaces.Mongo;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Data.EF.MongoRepository;
using WorkerService.Business.Implementation;
using WorkerService.Business.Interfaces;

namespace WorkerService.Extentions
{
    public static class BusinessServiceExtension
    {
        public static IServiceCollection RegisterBusinessServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient(typeof(IUnitOfWork), typeof(EFUnitOfWork));
            services.AddTransient(typeof(IRepository<>), typeof(EFRepository<>));
            services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));

            services.AddTransient<IProductWorkerBusiness, ProductWorkerBusiness>();
            services.AddTransient<IActivityLogWorkerBusiness, ActivityLogWorkerBusiness>();
            services.AddTransient<IAnnouncementBusiness, AnnouncementBusiness>();

            return services;
        }
    }

}
