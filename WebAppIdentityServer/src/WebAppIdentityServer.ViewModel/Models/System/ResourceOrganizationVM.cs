using System;
using WebAppIdentityServer.Utilities.Enum;

namespace WebAppIdentityServer.ViewModel.Models.System
{
    public class ResourceOrganizationVM
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Status Status { get; set; }
    }
}
