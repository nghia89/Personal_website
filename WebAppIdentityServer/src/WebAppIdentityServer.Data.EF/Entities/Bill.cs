using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class Bill : IEntityTracking, IOrgTracking
    {
        public long Id { set; get; }
        [MaxLength(256)]
        public string CustomerName { set; get; }
        [MaxLength(256)]
        public string CustomerAddress { set; get; }
        [MaxLength(50)]
        public string CustomerMobile { set; get; }
        [MaxLength(256)]
        public string CustomerMessage { set; get; }
        public PaymentMethod PaymentMethod { set; get; }
        public BillStatus BillStatus { set; get; }
        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }
        public Guid? UserId { set; get; }
        public bool IsPaid { get; set; }
        public AppUser User { set; get; }
        public IEnumerable<BillDetail> BillDetails { set; get; }
        public long OrgId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
