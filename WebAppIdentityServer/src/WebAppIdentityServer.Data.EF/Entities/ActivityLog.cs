using System;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class ActivityLog : IDateTracking, IEntityTracking
    {
        public long Id { get; set; }
        [MaxLength(50)]
        public string Action { get; set; }
        [MaxLength(50)]
        public string EntityName { get; set; }
        [MaxLength(50)]
        public string EntityId { get; set; }
        public string Content { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
    }
}
