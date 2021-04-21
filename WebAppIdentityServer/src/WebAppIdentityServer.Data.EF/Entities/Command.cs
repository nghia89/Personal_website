using System;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class Command : IDateTracking, IEntityTracking, IOrgTracking
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public long OrgId { get; set; }
    }
}
