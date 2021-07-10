using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class ProductAndCollection
    {
        public long ProductId { get; set; }
        public Product Product { get; set; }
        public long ProductCollectionId { get; set; }
        public ProductCollections ProductCollection { get; set; }
    }
}
