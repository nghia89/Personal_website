using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.DependencyInjection;
using WebAppIdentityServer.Api.Services;
using WebAppIdentityServer.Business.Implementation;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Dapper;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Repository.Implementation;
using WebAppIdentityServer.Repository.Interfaces;

namespace WebAppIdentityServer.Api.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddDIService(this IServiceCollection services)
        {

            services.AddTransient<IUserResolverService, UserResolverService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();


            //Register dapper in scope    
            services.AddScoped<IDapper, Dappers>();
            services.AddTransient(typeof(IUnitOfWork), typeof(EFUnitOfWork));
            services.AddTransient(typeof(IRepository<>), typeof(EFRepository<>));

            services.AddTransient<UserManager<AppUser>, UserManager<AppUser>>();
            services.AddTransient<SignInManager<AppUser>, SignInManager<AppUser>>();
            services.AddTransient<RoleManager<AppRole>, RoleManager<AppRole>>();
            services.AddTransient<IEmailSender, EmailSenderService>();

            #region Business
            services.AddTransient<IUserBusiness, UserBusiness>();
            services.AddTransient<IRolesBusiness, RolesBusiness>();
            services.AddTransient<IProductBusiness, ProductBusiness>();
            services.AddTransient<IFunctionBusiness, FunctionBusiness>();
            services.AddTransient<IProductCategoryBusiness, ProductCategoryBusiness>();
            services.AddTransient<ISlideBusiness, SlideBusiness>();
            services.AddTransient<ISystemConfigBusiness, SystemConfigBusiness>();
            services.AddTransient<IFeedbackBusiness, FeedbackBusiness>();

            #endregion

            #region Repository
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IProductCategoryRepository, ProductCategoryRepository>();
            services.AddTransient<IFunctionRepository, FunctionRepository>();
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<IBillDetailRepository, BillDetailRepository>();
            services.AddTransient<IProductQuantityRepository, ProductQuantityRepository>();
            services.AddTransient<IBillRepository, BillRepository>();
            services.AddTransient<ISlideRepository, SlideRepository>();
            services.AddTransient<ISystemConfigRepository, SystemConfigRepository>();
            services.AddTransient<IFeedbackRepository, FeedbackRepository>();
            services.AddTransient<ITagRepository, TagRepository>();
            #endregion

        }
    }
}
