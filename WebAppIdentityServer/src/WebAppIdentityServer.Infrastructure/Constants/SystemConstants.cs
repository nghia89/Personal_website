namespace WebAppIdentityServer.Utilities.Constants
{
    public class SystemConstants
    {
        public class Claims
        {
            public const string Permissions = "permissions";
            public const string Role = "role";
            public const string OrgId = "orgId";
            public const string Email = "email";
            public const string Username = "name";
            public const string UserId = "sub";
        }

        public static class RolesCT
        {
            public const string AdminRoleName = "Admin";
            public const string UserRoleName = "Member";
        }
    }
}
