using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Client.Services.Interfaces
{
    public interface IProductCategoryApiClient
    {
        Task<List<ProductCategoryVM>> getCategory();
    }
}
