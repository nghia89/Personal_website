using System.Collections.Generic;

namespace WebAppIdentityServer.ViewModel.Models.System
{
    public class UpdatePermissionRequest
    {
        public List<PermissionVm> Permissions { get; set; } = new List<PermissionVm>();
    }

    public class AddRoleToUser
    {
        public string UserId { get; set; }
        public string RoleName { get; set; }
    }
}
