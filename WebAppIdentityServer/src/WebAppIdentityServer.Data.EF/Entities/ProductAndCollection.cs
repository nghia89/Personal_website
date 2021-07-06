using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class ProductAndCollection
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public long ProductCollectionId { get; set; }
    }
}
