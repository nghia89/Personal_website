using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;
using WebAppIdentityServer.Client.Services.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Client.Controllers.Components
{
    public class SystemConfigViewComponent : ViewComponent
    {
        private ICommonApiClient _commonService;
        private IMemoryCache _memoryCache;

        public SystemConfigViewComponent(ICommonApiClient commonService, IMemoryCache memoryCache)
        {
            _commonService = commonService;
            _memoryCache = memoryCache;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var data =await _memoryCache.GetOrCreateAsync(CacheKeys.SystemConfig, async entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromSeconds(24);
                return  await _commonService.getSystemConfig();
            });
            return View(data);
        }
    }
}
