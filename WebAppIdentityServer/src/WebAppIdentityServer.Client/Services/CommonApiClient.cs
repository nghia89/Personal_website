using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebAppIdentityServer.Client.Services.Interfaces;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.Client.Services
{
    public class CommonApiClient : BaseApiClient, ICommonApiClient
    {
        public CommonApiClient(IHttpClientFactory httpClientFactory, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
                                : base(httpClientFactory, configuration, httpContextAccessor)
        {

        }

        public async Task<List<SlideShowVM>> getSlides()
        {
            return await GetListAsync<SlideShowVM>("commons/internal/slides_home");
        }

        public async Task<SystemConfigVM> getSystemConfig()
        {
            return await GetAsync<SystemConfigVM>("commons/internal/system_config");
        }
    }
}
