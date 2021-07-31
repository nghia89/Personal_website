using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkerService.Extentions
{
    public static class LogExtension
    {
        public static IServiceCollection RegisterLogging(this IServiceCollection services, HostBuilderContext context)
        {
            var section = context.Configuration.GetSection("Serilog");

            try
            {
                Log.Logger = new LoggerConfiguration()
                   .ReadFrom.Configuration(section)
                   .CreateLogger();

                services.AddLogging(loggingBuilder => loggingBuilder.AddSerilog());

                Log.Information("Data worker service started.");
            }
            catch (Exception ex)
            {

            }

            return services;
        }
    }

}
