using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class Blog : IDateTracking, IEntityTracking, IHasSeoMetaData, IOrgTracking
    {
        public long Id { get; set; }

        [MaxLength(256)]
        public string Name { set; get; }
        [MaxLength(256)]
        public string Image { set; get; }
        [MaxLength(500)]
        public string Description { set; get; }
        public string Content { set; get; }

        public bool? HotFlag { set; get; }
        public int? ViewCount { set; get; }
        public string Tags { get; set; }
        public IEnumerable<BlogTag> BlogTags { set; get; }
        public Status Status { set; get; }

        public string SeoAlias { get; set; }
        public string SeoKeywords { get; set; }
        public string SeoDescription { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public long OrgId { get; set; }
    }
}
