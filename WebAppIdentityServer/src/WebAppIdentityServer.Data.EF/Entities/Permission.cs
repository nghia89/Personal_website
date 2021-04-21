using System;
using WebAppIdentityServer.Data.EF.Interfaces;

namespace WebAppIdentityServer.Data.EF.Entities
{
    public class Permission : IDateTracking, IEntityTracking, IOrgTracking
    {
        public string FunctionId { get; set; }
        public Function Function { get; set; }
        public Guid AppRoleId { get; set; }
        public AppRole AppRole { get; set; }
        public string CommandId { get; set; }
        public Command Command { get; set; }

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public long OrgId { get; set; }
    }
}
