using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(WebAppIdentityServer.Api.Areas.Identity.IdentityHostingStartup))]
namespace WebAppIdentityServer.Api.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
            });
        }
    }
}