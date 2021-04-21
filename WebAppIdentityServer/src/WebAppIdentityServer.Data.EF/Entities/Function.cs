using System;
using System.ComponentModel.DataAnnotations;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class Function : IDateTracking, IEntityTracking, IOrgTracking
    {
        public string Id { get; set; }
        [MaxLength(200)]
        [Required]
        public string Name { get; set; }
        [MaxLength(200)]
        [Required]
        public string Url { get; set; }
        [Required]
        public int SortOrder { get; set; }
        [MaxLength(50)]
        public string ParentId { get; set; }
        [MaxLength(50)]
        public string Icon { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public long OrgId { get; set; }
    }
}
