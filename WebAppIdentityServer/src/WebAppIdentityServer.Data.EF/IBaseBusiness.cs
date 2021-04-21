using System;
using System.Collections.Generic;
using System.Text;

namespace WebAppIdentityServer.Data.EF
{
    public interface IBaseRepository
    {
        string UserId { get; }
        string UserName { get; }
        string Email { get; }
        string Role { get; }
        long OrgId { get; }
    }
}
