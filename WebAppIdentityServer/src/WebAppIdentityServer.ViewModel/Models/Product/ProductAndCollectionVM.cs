using System;
using System.Collections.Generic;
using WebAppIdentityServer.ViewModel.Enum;
using WebAppIdentityServer.ViewModel.Models.Common;

namespace WebAppIdentityServer.ViewModel.Models.Product
{
    public class ProductAndCollectionVM
    {
        public long ProductId { get; set; }
        public ProductVM Product { get; set; }
        public long ProductCollectionId { get; set; }
    }
}
