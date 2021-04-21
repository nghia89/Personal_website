using Microsoft.AspNetCore.Builder;
using WebAppIdentityServer.Api.Helpers;

namespace WebAppIdentityServer.Api.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseErrorWrapping(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorWrappingMiddleware>();
        }
    }
}
