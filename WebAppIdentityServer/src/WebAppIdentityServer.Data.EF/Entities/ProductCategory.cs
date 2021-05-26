using System;
using System.Collections.Generic;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class ProductCategory : IDateTracking, IEntityTracking, IHasSeoMetaData
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public long? ParentId { get; set; }
        public int SortOrder { get; set; }
        public string Image { get; set; }
        public Status Status { set; get; }
        public string SeoAlias { set; get; }
        public string SeoKeywords { set; get; }
        public string SeoDescription { set; get; }
        //public ICollection<Product> Products { set; get; }

        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
