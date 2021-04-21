using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebAppIdentityServer.Client.Services.Interfaces;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Client.Services
{
    public class ProductCategoryApiClient : BaseApiClient, IProductCategoryApiClient
    {

        public ProductCategoryApiClient(IHttpClientFactory httpClientFactory, IConfiguration configuration, 
                                IHttpContextAccessor httpContextAccessor): base(httpClientFactory, configuration, httpContextAccessor)
        {

        }

        public async Task<List<ProductCategoryVM>> getCategory()
        {
            return await GetListAsync<ProductCategoryVM>("productCategory/internal/get_product_cate");
        }
    }
}
