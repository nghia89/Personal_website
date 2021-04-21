using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;
using WebAppIdentityServer.Client.Services.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Client.Controllers.Components
{
    public class SlideViewComponent : ViewComponent
    {
        private ICommonApiClient _commonService;
        private IMemoryCache _memoryCache;

        public SlideViewComponent(ICommonApiClient commonService, IMemoryCache memoryCache)
        {
            _commonService = commonService;
            _memoryCache = memoryCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var data = await _memoryCache.GetOrCreateAsync(CacheKeys.Slides, async entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromSeconds(12);
                return  await _commonService.getSlides();
            });
            return View(data);
        }
    }
}
