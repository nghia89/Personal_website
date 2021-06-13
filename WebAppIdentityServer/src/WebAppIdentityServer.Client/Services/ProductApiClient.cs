using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using WebAppIdentityServer.Client.Services.Interfaces;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Client.Services
{
    public class ProductApiClient : BaseApiClient, IProductApiClient
    {

        public ProductApiClient(IHttpClientFactory httpClientFactory, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
                                 : base(httpClientFactory, configuration, httpContextAccessor)
        {

        }

        public async Task<List<ProductVM>> getProductByCate(long cateId)
        {
            return await GetListAsync<ProductVM>("products/internal/get_product_by_cate/" + cateId);
        }
    }
}
