using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Client.Services.Interfaces
{
    public interface IProductApiClient
    {
        Task<List<ProductVM>> getProductByCate(long cateId);
    }
}
