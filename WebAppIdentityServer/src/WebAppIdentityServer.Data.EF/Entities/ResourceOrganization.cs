using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using WebAppIdentityServer.Data.EF.Interfaces;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class ResourceOrganization : IDateTracking, IEntityTracking
    {
        public long Id { get; set; }
        [MaxLength(256)]
        public string Name { get; set; }
        public string Domain { get; set; }
        public string Email { get; set; }
        [MaxLength(15)]
        public string Phone { get; set; }
        [MaxLength(256)]
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Status Status { get; set; }
    }
}
