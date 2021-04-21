using System;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class BlogTag : IDateTracking, IEntityTracking, IOrgTracking
    {
        public long Id { get; set; }
        public long BlogId { set; get; }
        public Blog Blog { set; get; }
        public string TagId { set; get; }
        public Tag Tag { set; get; }
        public string CreatedBy { set; get; }
        public string UpdatedBy { set; get; }
        public DateTime DateCreated { set; get; }
        public DateTime? DateModified { set; get; }
        public long OrgId { get; set; }
    }
}
