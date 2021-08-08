using Hangfire;
using Hangfire.Mongo;
using Hangfire.Mongo.Migration.Strategies;
using Hangfire.Mongo.Migration.Strategies.Backup;
using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using WebAppIdentityServer.Api.Extensions;
using WebAppIdentityServer.Api.Hubs;
using WebAppIdentityServer.Api.Hubs.Bus;
using WebAppIdentityServer.Api.IdentityServer;
using WebAppIdentityServer.Api.Services;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Data.EF.MongoRepository;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Common;
using static WebAppIdentityServer.Api.Hubs.NotifyHub;

namespace WebAppIdentityServer.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        readonly string AllowSpecificOrigins = "_allowSpecificOrigins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var mySqlConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContextPool<ApplicationDbContext>(options => options.UseMySql(mySqlConnectionString, ServerVersion.AutoDetect(mySqlConnectionString)));

            services.AddIdentity<AppUser, AppRole>()
               .AddEntityFrameworkStores<ApplicationDbContext>();

            services.Configure<AppSettingConfig>(Configuration.GetSection("AppSettingConfig"));
            services.AddTransient<DbInitializer>();
            services.RegisterQueueServices(Configuration);

            var builder = services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
            })
           .AddInMemoryApiResources(ConfigIdentity.Apis)
           .AddInMemoryApiScopes(ConfigIdentity.ApiScope)
           .AddInMemoryClients(Configuration.GetSection("IdentityServer:Clients"))
           .AddInMemoryIdentityResources(ConfigIdentity.Ids)
           .AddAspNetIdentity<AppUser>()
           .AddProfileService<IdentityProfileService>()
           .AddDeveloperSigningCredential();

            services.AddCors(options =>
            {
                options.AddPolicy(AllowSpecificOrigins,
                builder =>
                {
                    builder.AllowAnyHeader()
                       .AllowAnyMethod()
                       .WithOrigins("http://localhost:4200")
                       .AllowCredentials();
                });
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "appcookie";
            });

            services.Configure<IdentityOptions>(options =>
            {
                // Default Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.SignIn.RequireConfirmedAccount = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.Password.RequiredLength = 8;
                options.Password.RequireDigit = true;
                options.Password.RequireUppercase = true;
                options.User.RequireUniqueEmail = true;
            });
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            #region Config policy
            services.AddAuthentication()
                .AddLocalApi("Bearer", option =>
                {
                    option.ExpectedScope = "api.webApp";
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Bearer", policy =>
                {
                    policy.AddAuthenticationSchemes("Bearer");
                    policy.RequireAuthenticatedUser();
                });
            });
            #endregion

            #region  config add folder
            services.AddRazorPages(options =>
            {
                options.Conventions.AddAreaFolderRouteModelConvention("Identity", "/Account/", model =>
                {
                    foreach (var selector in model.Selectors)
                    {
                        var attributeRouteModel = selector.AttributeRouteModel;
                        attributeRouteModel.Order = -1;
                        attributeRouteModel.Template = attributeRouteModel.Template.Remove(0, "Identity".Length);
                    }
                });
            });
            #endregion

            services.AddDIService();
            services.AddSwaggerService();
            services.AddHangfireDashboardService(Configuration);
            services.AddSignalrService(Configuration);

            services.Configure<MongoDbSettings>(Configuration.GetSection("MongoDbSettings"));

            services.AddSingleton<IMongoDbSettings>(serviceProvider =>
                serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);
            services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseErrorWrapping();
            app.UseStaticFiles();
            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(AllowSpecificOrigins);
            app.UseAuthorization();

            #region  config run razorPages
            app.AddSignalrConfigure();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapRazorPages();
            });
            #endregion
            app.UseHangfireDashboard();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.OAuthClientId("swagger");
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Knowledge Space API V1");
            });
        }
    }
}
