using IdentityServer4.Models;
using System.Collections.Generic;

namespace WebAppIdentityServer.Api.IdentityServer
{
    public class ConfigIdentity
    {
        public static IEnumerable<IdentityResource> Ids =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        public static IEnumerable<ApiResource> Apis =>
             new ApiResource[]
             {
                new ApiResource("api.webApp", "webApp API")
             };

        public static IEnumerable<ApiScope> ApiScope =>
            new ApiScope[]
            {
                new ApiScope("api.webApp", "webApp API")
            };
    }
}
