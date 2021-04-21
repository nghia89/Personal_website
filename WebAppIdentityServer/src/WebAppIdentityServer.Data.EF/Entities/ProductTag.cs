using System;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class ProductTag : IDateTracking, IEntityTracking, IOrgTracking
    {
        public long Id { get; set; }
        public long ProductId { set; get; }
        public Product Product { set; get; }
        [StringLength(50)]
        public string TagId { set; get; }
        public Tag Tag { set; get; }

        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public long OrgId { get; set; }

    }
}
