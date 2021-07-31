using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
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

            services.AddTransient<IProductWorkerBusiness, ProductWorkerBusiness>();
            services.AddTransient<IActivityLogWorkerBusiness, ActivityLogWorkerBusiness>();


            return services;
        }
    }

}
