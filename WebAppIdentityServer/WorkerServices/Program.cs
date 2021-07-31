using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.Data.EF;
using WebAppIdentityServer.Data.EF.Entities;
using WebAppIdentityServer.Utilities;
using WorkerService.Extentions;

namespace WorkerServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
                 Host.CreateDefaultBuilder(args)
                .UseWindowsService()
                 .ConfigureLogging(loggingBuilder =>
                 {
                     var logger = new LoggerConfiguration()
                         .ReadFrom.Configuration(new ConfigurationBuilder().AddJsonFile("appsettings.json").Build())
                         .CreateLogger();
                     loggingBuilder.AddSerilog(logger, dispose: true);
                 })
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    var isDevelopment = hostingContext.HostingEnvironment.IsDevelopment();
                    var nameSetting = isDevelopment ? "appsettings.Development.json" : "appsettings.json";
                    config.AddConfiguration(new ConfigurationBuilder().AddJsonFile(nameSetting).Build());
                })
                 .ConfigureServices((hostContext, services) =>
                 {
                     var connectSt = new ConnectionStrings();
                     hostContext.Configuration.GetSection("ConnectionStrings").Bind(connectSt);

                     services.AddDbContextPool<ApplicationDbContext>(options => options.UseMySql(connectSt.DefaultConnection, ServerVersion.AutoDetect(connectSt.DefaultConnection)));
                     services.AddIdentity<AppUser, AppRole>()
                        .AddEntityFrameworkStores<ApplicationDbContext>();

                     services.RegisterConfigurationServices(hostContext);
                     services.RegisterBusinessServices();
                     services.RegisterRepositoryServices();
                     services.RegisterLogging(hostContext);
                     services.RegisterQueueServices(hostContext);
                     services.AddHostedService<Worker>();
                 });
    }
}
