using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;
using WebAppIdentityServer.Client.Services.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Client.Controllers.Components
{
    public class CategoryMenuViewComponent : ViewComponent
    {
        private IProductCategoryApiClient _productCategoryApiClient;
        private IMemoryCache _memoryCache;

        public CategoryMenuViewComponent(IProductCategoryApiClient productCategoryApiClient, IMemoryCache memoryCache)
        {
            _productCategoryApiClient = productCategoryApiClient;
            _memoryCache = memoryCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var categories =await _memoryCache.GetOrCreateAsync(CacheKeys.ProductCategories, async entry =>
              {
                  entry.SlidingExpiration = TimeSpan.FromSeconds(3);
                  return await _productCategoryApiClient.getCategory();
              });
            return View(categories);
        }
    }
}